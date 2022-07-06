import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { markPresence } from "../index.js";
function userDetailsCard(props) {
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  // const snackText = "hello";

  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  function handlePresent() {
    // console.log(props);
    markPresence(props.userDetails.regId).then((res) => {
      // console.log(res);
      if (res.request.status === 300) {
        changeSnackText(
          "Please check your Registration Id. Your Registration was not found in database."
        );
        props.changeVis(false);
      } else if (res.request.status === 500) {
        changeSnackText(res.response.data);
      } else {
        props.changeVis(true);
        // console.log(res.data.acknowledged);
        props.changeUserDetails({
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
            {props.userDetails.name}
          </Typography>
        </div>
        <div style={{ margin: "1rem" }}>
          <Typography m={2} variant="p" style={{ display: "inline-block" }}>
            Reg-Id:
          </Typography>
          <Typography variant="p" style={{ display: "inline-block" }}>
            {props.userDetails.regId}
          </Typography>
        </div>
        <div style={{ margin: "1rem" }}>
          <Typography m={2} variant="p" style={{ display: "inline-block" }}>
            Seat No:
          </Typography>
          <Typography variant="p" style={{ display: "inline-block" }}>
            {props.userDetails.seatNo}
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
      <Snackbar
        className="regSnack"
        open={open}
        onClose={handleClose}
        message={snackText}
        action={action}
      />
    </Box>
  );
}

export default userDetailsCard;
