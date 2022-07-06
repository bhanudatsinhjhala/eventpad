import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { uploadFile, verifyjwt } from "..";
// import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function UploadData() {
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
  //   const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  const [user, setUser] = useState("");
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  function handleChange(e) {
    e.preventDefault();
    // console.log(e.target.files[0].name);
    const file = e.target.files[0];
    setUser(file);
    // console.log(user);
  }
  function formSubmit(e) {
    e.preventDefault();
    // console.log(user, "user");
    uploadFile(user).then((res) => {
      if (res.request.status === 500) {
        // console.log(res);
        changeSnackText(res.response.data);
      } else if (res.request.status === 300) {
        navigate("/login");
      } else {
        changeSnackText("hello");
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
    <div>
      <Header />
      <Container>
        <Card className="regForm" sx={{ borderRadius: "3%" }}>
          <CardContent sx={{ margin: 6 }}>
            <Typography variant="h5">
              Welcome, to IEEE Event Attendance System
            </Typography>
            <Box component="form" sx={{ maxWidth: 280, margin: "20px auto" }}>
              <Stack spacing={3}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    id="contained-button-file"
                    single
                    type="file"
                    name="file"
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    onClick={formSubmit}
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
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
    </div>
  );
}

export default UploadData;
