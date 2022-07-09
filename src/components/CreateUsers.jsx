import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Snackbar,
  Grow,
} from "@mui/material";
import { verifyjwt } from "..";
import CreateUsersForm from "./CreateUsersForm.jsx";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function CreateUsers() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      await verifyjwt(token).then((res) => {
        console.log(res.request);
        if (res.request.status !== 200) {
          navigate("/login");
        } else if (JSON.parse(res.request.response).role === "Volunteer") {
          navigate("/");
          alert("Sorry you can not access this page because you are not admin");
        }
      });
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, []);
  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="primary"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Header />
      <Container>
        <Grow in={true} {...(true ? { timeout: 1300 } : {})}>
          <Card
            className="regForm"
            sx={{ borderRadius: "3%", maxWidth: 300 }}
            elevation={10}
          >
            <CardContent sx={{ maxWidth: 280, margin: "20px auto" }}>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Create Volunteers Accounts
              </Typography>

              <Box>
                <CreateUsersForm changeSnackText={changeSnackText} />
              </Box>
            </CardContent>
          </Card>
        </Grow>
        <Snackbar
          className="regSnack"
          open={open}
          onClose={handleClose}
          message={snackText}
          action={action}
        />
      </Container>
    </div>
  );
}

export default CreateUsers;
