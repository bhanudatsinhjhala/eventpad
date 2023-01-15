import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles';
import { yellowColorTheme } from "../colorTheme.js";
import RegistrationForm from "./RegistrationForm";
import UserDetailsCard from "./userDetailsCard";
import { Container, Snackbar, Box, Button, CssBaseline } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function RegistrationId() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [regid, setRegid] = useState();
  // const [data, setData] = useState();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    regId: "",
    seatNo: "",
    _id: "",
    __v: "",
  });
  const [visiblity, setVisibility] = useState(true);
  const [snackText, setSnackText] = useState("hello");
  // const snackText = "hello";
  const changeVis = (value) => {
    setVisibility(value);
  };
  const changeUserDetails = (value) => {
    setUserDetails(value);
  };
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };

  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  function handleClick(value) {
    if (value === "home") {
      navigate("/");
    }
  }
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
      <Container>
        <Header />
        <ThemeProvider theme={yellowColorTheme} >
          <CssBaseline />
          <Container sx={{ margin: "10px auto" }}>
            {visiblity ? (
              <RegistrationForm
                changeSnackText={changeSnackText}
                changeVis={changeVis}
                changeUserDetails={changeUserDetails}
              />
            ) : (
              <UserDetailsCard
                changeUserDetails={changeUserDetails}
                userDetails={userDetails}
                changeVis={changeVis}
              />
            )}
            <Box sx={{ width: "fit-content", margin: "30px auto" }}>
              <Button
                sx={{ margin: "auto", color: "#ffa306" }}
                variant="outlined"
                color="primary"
                onClick={() => handleClick("home")}
              >
                Back to Home
              </Button>
            </Box>
            <Snackbar
              className="regSnack"
              open={open}
              onClose={handleClose}
              message={snackText}
              action={action}
            />
          </Container>
        </ThemeProvider>
      </Container>
    </div >
  );
}

export default RegistrationId;
