import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { getUserDetails, markPresence } from "../index.js";
function RegistrationId() {
  const [regid, setRegid] = useState();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    regId: "",
    seatNo: "",
    present: "",
    _id: "",
    __v: "",
  });
  function handleChange(e) {
    console.log(e.target.value);
    setRegid(e.target.value);
  }
  function formSubmit(e) {
    e.preventDefault();
    console.log(regid);
    getUserDetails(regid).then((res) => {
      console.log(res.data[0]);
      setUserDetails(res.data[0]);
    });
    setRegid("");
  }
  function handlePresent() {
    console.log(true);
    console.log(userDetails);
    markPresence(userDetails.regId).then((res) => {
      // console.log(res.data.acknowledged);
      if (res.data.acknowledged === true) {
        setUserDetails({
          name: "",
          email: "",
          regId: "",
          seatNo: "",
          present: "",
          _id: "",
          __v: "",
        });
      }
    });
  }
  return (
    <div>
      <Container>
        <Header />
        <Container mt={2}>
          <Box component="form" className="regForm">
            <h1>Registration Id</h1>
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
          <Box
            component="card"
            style={{
              margin: "auto",
              width: "fit-content",
            }}
          >
            <div
              style={{
                margin: "5rem auto",
                padding: "10px",
                borderRadius: "3% 3% 3% 3% / 6% 6% 6% 6% ",
                border: "1px solid #c9c4c4",
                width: "fit-content",
              }}
            >
              <div style={{ margin: "1rem" }}>
                <Typography
                  m={2}
                  variant="p"
                  style={{ display: "inline-block" }}
                >
                  Name:
                </Typography>
                <Typography variant="p" style={{ display: "inline-block" }}>
                  {userDetails.name}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography
                  m={2}
                  variant="p"
                  style={{ display: "inline-block" }}
                >
                  Reg-Id:
                </Typography>
                <Typography variant="p" style={{ display: "inline-block" }}>
                  {userDetails.regId}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography
                  m={2}
                  variant="p"
                  style={{ display: "inline-block" }}
                >
                  Seat No:
                </Typography>
                <Typography variant="p" style={{ display: "inline-block" }}>
                  {userDetails.seatNo}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Button
                  variant="outlined"
                  style={{ marginLeft: "1rem" }}
                  color="success"
                  onClick={handlePresent}
                >
                  <DoneIcon style={{ marginRight: "10px" }} />
                  Mark Presence
                </Button>
              </div>
            </div>
          </Box>
        </Container>
      </Container>
    </div>
  );
}

export default RegistrationId;
