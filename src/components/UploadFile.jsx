import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "..";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function UploadData(props) {
  const navigate = useNavigate();
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, []);
  //   const navigate = useNavigate();
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
    // console.log(e.target.files[0].name);
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
        navigate("/");
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
        <Card
          sx={{
            margin: "auto",
            marginTop: {
              xs: 13,
              md: "12rem",
            },
            borderRadius: "3%",
            maxWidth: 300,
          }}
        >
          <CardContent sx={{ margin: 1 }}>
            <Typography variant="h5">
              Upload Your Participants Data's Excel Sheet here.
            </Typography>
            <Box component="form" sx={{ maxWidth: 280, margin: "20px auto" }}>
              <label htmlFor="contained-button-file">
                <Stack spacing={3}>
                  <Input
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    id="contained-button-file"
                    single
                    type="file"
                    name="file"
                    color="primary"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <LoadingButton
                    type="submit"
                    size="medium"
                    loading={loading}
                    variant="outlined"
                    onClick={formSubmit}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </label>
            </Box>
          </CardContent>
        </Card>
        <Snackbar
          className="regSnack"
          open={open}
          onClose={handleClose}
          message={snackText}
          action={action}
        />
      </Container>
    </div>
  );
}

export default UploadData;
