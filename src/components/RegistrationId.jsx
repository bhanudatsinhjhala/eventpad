import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserDetailsCard from "./userDetailsCard";
import { getUserDetails } from "../index";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function RegistrationId() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [regid, setRegid] = useState();
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
  function handleChange(e) {
    console.log(e.target.value);
    setRegid(e.target.value);
  }
  function formSubmit(e) {
    e.preventDefault();
    // console.log(regid);
    setRegid("");
    getUserDetails(regid).then((res) => {
      console.log(res);
      if (res.data.length === 0) {
        changeSnackText(
          "Please check your Registration Id. Your Registration was not found in database."
        );
        changeVis(true);
      } else if (res.data.message !== null) {
        changeSnackText(res.data.message);
      } else {
        setUserDetails(res.data[0]);
        changeVis(false);
        console.log(visiblity);
      }
    });
  }
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
        <Container mt={2}>
          {visiblity ? (
            <Box component="form" className="regForm">
              <Typography variant="h3" sx={{ marginBottom: "20px" }}>
                Registration Id
              </Typography>
              <Stack direction="row" spacing={3}>
                <TextField name="regid" value={regid} onChange={handleChange} />
                <Button
                  className="submitBtn"
                  onClick={formSubmit}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
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
