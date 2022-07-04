import React, { useState } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { loginUser, verifyjwt } from "..";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  const [user, setUser] = useState({
    membershipId: "",
    password: "",
  });
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
    // console.log(user);
  }
  function formSubmit(e) {
    e.preventDefault();
    loginUser(user).then((res, err) => {
      // console.log(res);
      // console.log(err.response);
      if (res.status === 200) {
        // console.log(res.data);
        if (res.data.message) {
          // console.log(res.data);
          changeSnackText(res.data.message);
        } else {
          sessionStorage.setItem("token", res.data);
          verifyjwt(res.data).then((res) => {
            console.log(res);
            if (res.data.message) {
              // console.log(res.data);
              changeSnackText(res.data.message);
            } else {
              navigate("/");
            }
          });
        }
      }
    });
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
    <Container>
      <Card className="regForm" sx={{ borderRadius: "3%" }}>
        <CardContent sx={{ margin: 6 }}>
          <Typography variant="h5">
            Welcome, to IEEE Event Attendance System
          </Typography>
          <Box component="form" sx={{ maxWidth: 280, margin: "20px auto" }}>
            <Stack spacing={3}>
              <TextField
                type="text"
                className="textInput"
                value={user.membershipId}
                name="membershipId"
                onChange={handleChange}
                placeholder="Enter your Membership Id"
              ></TextField>
              <TextField
                type="password"
                value={user.password}
                name="password"
                onChange={handleChange}
                className="textInput"
                placeholder="Password"
              ></TextField>
              <Button onClick={formSubmit} variant="outlined">
                Login
              </Button>
            </Stack>
          </Box>
          <Snackbar
            className="regSnack"
            open={open}
            onClose={handleClose}
            message={snackText}
            action={action}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
