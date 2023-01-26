import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UserDetailsCard from "./userDetailsCard";
import { getUserDetails } from "../index";
import { ThemeProvider } from '@mui/material/styles';
import { yellowColorTheme } from "../colorTheme.js";
import { QrReader } from "react-qr-reader";
import { Box, CssBaseline, Snackbar, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./App.css";
import { Typography } from "@mui/material";
function QrScanner() {
  // function checkAbsentCount() {
  //   totalAbsent().then((res) => {
  //     // console.log(res);
  //     setAbsentCount(res.data.count);
  //   });
  // }
  // useEffect(() => {
  //   checkAbsentCount();
  // });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState();
  const [snackText, setSnackText] = useState("hello");
  // var [absentCount, setAbsentCount] = useState();
  const [visiblity, setVisibility] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    regId: "",
    seatNo: "",
    _id: "",
    __v: "",
  });
  const changeVis = (value) => {
    setVisibility(value);
  };
  const changeUserDetails = (value) => {
    setUserDetails(value);
  };
  const changeSnackText = (value) => {
    setSnackText(value);
    setTimeout(() => {
      setOpen(false);
    }, 8000)
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
  function qrData(data) {
    if (data !== null) {
      console.info("qr data====>", data);
      getUserDetails(data, JSON.parse(sessionStorage.getItem("token"))).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          if (res.response.status === 401) {
            changeSnackText(res.response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            changeSnackText(res.response.data.message);
          }
        } else {
          setUserDetails(res.data);
          changeVis(false);
        }
      });
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
        fontSize="large"
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Header />
      <ThemeProvider theme={yellowColorTheme} >
        <CssBaseline />
        {visiblity ? (
          <div>
            <Typography
              sx={{
                margin: "auto",
                marginTop: "5rem",
                width: "fit-content",
                padding: "5px",
                border: "1px solid #ffa306",
              }}
              variant="body2"
            >
              Absent:
            </Typography>
            <QrReader
              constraints={{ facingMode: "environment" }}
              scanDelay={500}
              onResult={(result, error) => {
                if (result) {
                  // console.log(result.text);
                  qrData(parseInt(result.text));
                } else if (error) {
                  // console.info(error);
                  // qrData("");
                }
              }}
              videoStyle={{
                height: "inherit",
                margin: "auto",
                width: "88%",
                position: "none",
              }}
              videoContainerStyle={{ paddingTop: "0px", height: "inherit" }}
              className="qrContainer"
              style={{ width: "100%", height: "50vh" }}
            />
          </div>
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
      </ThemeProvider>
    </div>
  );
}

export default QrScanner;
