import React, { useState } from "react";
import { Typography, Grow, CssBaseline, Button, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { yellowColorTheme } from "../colorTheme.js";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { markPresence } from "../api.js";

function userDetailsCard(props) {
  const checked = true;
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  // const snackText = "hello";

  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  async function handlePresent() {
    markPresence(props.userDetails.regId).then(async (res) => {
      if (res.request.status === 200) {
        changeSnackText(res.data.message);
        props.changeUserDetails({
          name: "",
          email: "",
          regId: "",
          seatNo: "",
          present: "",
          _id: "",
          __v: "",
        });
        props.changeVis(true);
      } else {
        changeSnackText(res.response.data.message);
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
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <IconButton
          size="small"
          aria-label="close"
          color="primary"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </ThemeProvider>
    </React.Fragment>
  );
  return (
    <Grow in={checked} {...(checked ? { timeout: 1300 } : {})}>
      <div>
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
      </div>
    </Grow>
  );
}

export default userDetailsCard;
