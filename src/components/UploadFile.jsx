import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Input,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "..";
import {
  Snackbar, Button,
  DialogTitle, DialogContentText, DialogContent, DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function UploadData(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackText, setSnackText] = useState(
    "Please Upload Excel or Spread Sheet."
  );
  const [user, setUser] = useState("");
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files[0].name);
    const file = e.target.files[0];
    setUser(file);
    // console.log(user);
  }
  function formSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // console.log(user, "user");
    uploadFile(user, JSON.parse(sessionStorage.getItem("token")), props.eventId).then((res, err) => {
      // console.log(res);
      if (res.request.status === 200) {
        changeSnackText(res.data.message);
        props.handleCloseDialog();
      } else if (res) {
        changeSnackText(res.response.data.message);
      } else {
        console.info(err);
      }
      setLoading(false);
    });
  }
  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  const yellowColorTheme = createTheme({
    palette: {
      yellowBtn: {
        main: '#ffa306',
        contrastText: '#fff',
      },
    },
  });
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
      <ThemeProvider theme={yellowColorTheme}>
        <DialogTitle>Event Setup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload Your Participants Data's Excel Sheet here.
          </DialogContentText>
          <Box component="form" sx={{ maxWidth: 280, margin: "20px auto" }}>
            <label htmlFor="contained-button-file">
              <Stack spacing={3}>
                <Input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  id="contained-button-file"
                  single
                  type="file"
                  color="yellowBtn"
                  name="file"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Stack>
            </label>
          </Box>
          <Snackbar
            className="regSnack"
            open={open}
            onClose={handleClose}
            message={snackText}
            action={action}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button onClick={props.handleCloseDialog} variant="outlined" color="yellowBtn">Cancel</Button>
          <LoadingButton
            type="submit"
            size="medium"
            onClick={formSubmit}
            loading={loading}
            color="yellowBtn"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </ThemeProvider>
    </div>
  );
}

export default UploadData;
