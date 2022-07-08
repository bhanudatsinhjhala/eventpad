import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import RegistrationForm from "./RegistrationForm";
import UserDetailsCard from "./userDetailsCard";
import { verifyjwt } from "../index";
import { Box, Container, Button, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function RegistrationId() {
  const navigate = useNavigate();
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      await verifyjwt(token).then((res) => {
        // console.log(res.request);
        if (res.request.status !== 200) {
          navigate("/login");
        }
      });
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, []);
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

  function handleClick(value) {
    if (value === "home") {
      navigate("/");
    }
  }
  function handleClose() {
    if (open === true) {
      setOpen(false);
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
              sx={{ margin: "auto" }}
              variant="outlined"
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
      </Container>
    </div>
  );
}

export default RegistrationId;
