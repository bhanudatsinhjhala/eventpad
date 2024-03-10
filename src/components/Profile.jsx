import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header.jsx";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import PasswordChangeDialog from "./PasswordChangeDialog.jsx";

import { ThemeProvider } from "@mui/material/styles";
import { yellowColorTheme } from "../colorTheme.js";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  CssBaseline,
  Typography,
  CardActions,
  CardContent,
  Card,
  Container,
  Snackbar,
} from "@mui/material";

import { getProfile } from "../api.js";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  async function isAuthenticated() {
    const cookies = document.cookie;
    const token = cookies.split(", ")[0].split("=")[1];
    if (token === null) {
      navigate("/login");
    }
  }

  const getUserProfile = async () => {
    await getProfile().then((res, err) => {
      if (err) navigate("/login");
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        changeSnackText(res.response.data.message);
      }
      setUserProfile((userProfile) => ({ ...userProfile, ...res.data.data }));
    });
  };
  const changeUserProfile = (data) => {
    setUserProfile((userProfile) => ({ ...userProfile, ...data }));
  };
  useEffect(() => {
    isAuthenticated();
    getUserProfile();
  }, []);
  const navigate = useNavigate();
  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
  };
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
    <>
      <Header />
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Container sx={{ marginTop: "25vh" }}>
          <Card sx={{ minWidth: "300px", maxWidth: "500px", margin: "auto" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {userProfile.role}
              </Typography>
              <Typography variant="h5" component="div">
                {userProfile.firstName ? (
                  `${userProfile.firstName}  ${userProfile.lastName}`
                ) : (
                  <>Please update your name</>
                )}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {userProfile.email}
              </Typography>
              <Typography variant="body2">
                {userProfile.membershipId}
                <br />
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                maxWidth: "90%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <UpdateProfileDialog
                userProfile={userProfile}
                changeUserProfile={changeUserProfile}
                changeSnackText={changeSnackText}
              />
              <PasswordChangeDialog changeSnackText={changeSnackText} />
            </CardActions>
          </Card>
          <Snackbar
            className="regSnack"
            open={open}
            onClose={handleClose}
            message={snackText}
            action={action}
          />
        </Container>
      </ThemeProvider>
    </>
  );
}
