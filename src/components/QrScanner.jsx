import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UserDetailsCard from "./userDetailsCard";
import { getUserDetails, verifyjwt } from "../index";
import { QrReader } from "react-qr-reader";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Button from "@mui/material/Button";
import "./App.css";
function QrScanner() {
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
  // const [data, setData] = useState();
  const [snackText, setSnackText] = useState("hello");
  // const navigate = useNavigate();
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
  function qrData(data) {
    if (data !== null) {
      getUserDetails(data).then((res) => {
        // console.log(res);
        if (res.request.status === 500) {
          changeSnackText(res.response.data);
          changeVis(true);
        } else if (res.request.status === 300) {
          navigate("/login");
        } else {
          setUserDetails(res.data[0]);
          changeVis(false);
          // console.log(visiblity);
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
      {visiblity ? (
        <div>
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
          <Box sx={{ width: "fit-content", margin: "30px auto" }}>
            <Button
              sx={{ margin: "auto" }}
              variant="outlined"
              onClick={() => handleClick("home")}
            >
              Back to Home
            </Button>
          </Box>
        </div>
      ) : (
        <UserDetailsCard
          changeUserDetails={changeUserDetails}
          userDetails={userDetails}
          changeVis={changeVis}
        />
      )}
      <Snackbar
        className="regSnack"
        open={open}
        onClose={handleClose}
        message={snackText}
        action={action}
      />
    </div>
  );
}

export default QrScanner;
