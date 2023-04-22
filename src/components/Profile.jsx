import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "./Header.jsx";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import PasswordChangeDialog from "./PasswordChangeDialog.jsx";

import { ThemeProvider } from "@mui/material/styles";
import { yellowColorTheme } from "../colorTheme.js";
import { Container } from "@mui/material";

import {
  CssBaseline,
  Typography,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";

import { getProfile, checkJwtTokenExpire } from "../api.js";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }

  const getUserProfile = async () => {
    await checkJwtTokenExpire();
    await getProfile().then((res, err) => {
      console.log("userProfile ----", res);
      if (res.status === 200) {
        setUserProfile((userProfile) => ({ ...userProfile, ...res.data.data }));
      }
    });
  };
  useEffect(() => {
    isAuthenticated();
    getUserProfile();
  }, []);
  const navigate = useNavigate();

  //   const changeSnackText = (value) => {
  //     setSnackText(value);
  //     setOpen(true);
  //   };

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
                  userProfile.firstName + userProfile.lastName
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
                maxWidth: "80%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <UpdateProfileDialog userProfile={userProfile} />
              <PasswordChangeDialog />
            </CardActions>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  );
}
