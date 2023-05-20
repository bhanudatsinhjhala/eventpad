import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { getAllParticipantDetails } from "../api.js";
import EnhancedTable from "./ParticipantTable.jsx";
import { useNavigate } from "react-router-dom";
import { yellowColorTheme } from "../colorTheme.js";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function EventParticpant(props) {
  const [participantDetails, setParticipantDetails] = useState([
    {
      regId: 0,
      name: "Loading",
      email: " ",
      present: " ",
    },
  ]);
  async function getAllParticipant() {
    getAllParticipantDetails(props.eventId).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          props.changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        props.changeSnackText(res.response.data.message);
      } else {
        res.data.forEach((element) => {
          element.present = JSON.stringify(element.present);
        });
        console.log("data", res.data[0]);
        setParticipantDetails(res.data);
      }
    });
  }
  async function isAuthenticated() {
    const cookies = document.cookie;
    const token = cookies.split(", ")[0].split("=")[1];
    const role = sessionStorage.getItem("role");
    if (token === null) {
      navigate("/login");
    } else if (role === "volunteer" || role === "execom") {
      return navigate("/");
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, []);
  const navigate = useNavigate();

  const [openParticipantDialog, setOpenParticipantDialog] = useState(false);

  const handleClickOpenParticipantDialog = () => {
    getAllParticipant();
    setOpenParticipantDialog(true);
  };

  function handleParticipantClose() {
    if (openParticipantDialog === true) {
      setOpenParticipantDialog(false);
      setParticipantDetails([]);
    }
  }

  return (
    <>
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Container sx={{ margin: "auto" }}>
          <Button
            variant="text"
            sx={{ textTransform: "capitalize", padding: "0" }}
            color="primary"
            onClick={handleClickOpenParticipantDialog}
          >
            {props.eventName}
          </Button>
          <Dialog
            open={openParticipantDialog}
            onClose={handleClickOpenParticipantDialog}
            fullScreen
          >
            <AppBar sx={{ position: "fixed", backgroundColor: "#ffa306" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleParticipantClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {props.eventName}
                </Typography>
                <Button variant="outlined" color="inherit">
                  PR: {participantDetails.length}
                </Button>
              </Toolbar>
            </AppBar>
            <Container>
              <EnhancedTable rows={participantDetails} />
            </Container>
          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}
