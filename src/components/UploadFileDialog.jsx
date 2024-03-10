import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api.js";
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function UploadData(props) {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [snackText, setSnackText] = useState(
  //   "Please Upload Excel or Spread Sheet."
  // );
  const [user, setUser] = useState("");
  // const changeSnackText = (value) => {
  //   setSnackText(value);
  //   setTimeout(() => {
  //     setOpen(false);
  //   }, 8000)
  // };
  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files[0].name);
    const file = e.target.files[0];
    setUser(file);
  }
  async function formSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (user === null) {
      props.changeSnackText("Please Upload Excel or Spread Sheet.");
    } else {
      uploadFile(user, props.eventId).then((res, err) => {
        if (res.request.status !== 200) {
          if (res.response.status === 401 || res.response.status === 403) {
            props.changeSnackText(res.response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            props.changeSnackText(res.response.data.message);
          }
        } else {
          props.changeSnackText(res.data.message);
          props.handleCloseDialog();
        }
        setLoading(false);
      });
    }
  }
  // function handleClose() {
  //   if (open === true) {
  //     setOpen(false);
  //   }
  // }
  const yellowColorTheme = createTheme({
    palette: {
      primary: {
        main: "#ffa306",
        contrastText: "#fff",
      },
    },
  });
  // const action = (
  //   <React.Fragment>
  //     {/* <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button> */}
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="primary"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );
  return (
    <div>
      <ThemeProvider theme={yellowColorTheme}>
        <DialogTitle>Event Setup</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#fff" }}>
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
                  color="primary"
                  name="file"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Stack>
            </label>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button
            onClick={props.handleCloseDialog}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="medium"
            onClick={formSubmit}
            loading={loading}
            color="primary"
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
