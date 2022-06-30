import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { getUserDetails, markPresence } from "../index.js";
function userDetailsCard(props) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    regId: "",
    seatNo: "",
    _id: "",
    __v: "",
  });
  function getUserOne(regid) {
    getUserDetails(regid).then((res) => {
      console.log(res.data[0]);
      setUserDetails(res.data[0]);
      props.changeVis(false);
    });
  }
  useEffect(() => {
    getUserOne(props.regId);
  }, []);
  function handlePresent() {
    console.log(true);
    markPresence(props.regId).then((res) => {
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
      props.changeVis(true);
    });
  }
  return (
    <Box
      component="card"
      style={{
        margin: "auto",
        width: "fit-content",
      }}
    >
      <div className="card">
        <div style={{ margin: "1rem" }}>
          <Typography m={2} variant="p" style={{ display: "inline-block" }}>
            Name:
          </Typography>
          <Typography variant="p" style={{ display: "inline-block" }}>
            {userDetails.name}
          </Typography>
        </div>
        <div style={{ margin: "1rem" }}>
          <Typography m={2} variant="p" style={{ display: "inline-block" }}>
            Reg-Id:
          </Typography>
          <Typography variant="p" style={{ display: "inline-block" }}>
            {userDetails.regId}
          </Typography>
        </div>
        <div style={{ margin: "1rem" }}>
          <Typography m={2} variant="p" style={{ display: "inline-block" }}>
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
  );
}

export default userDetailsCard;
