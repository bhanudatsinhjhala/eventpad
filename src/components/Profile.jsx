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
export default function Profile() {
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }
  useEffect(() => {
    isAuthenticated();
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
                Super Admin
              </Typography>
              <Typography variant="h5" component="div">
                Bhanudatsinh Jhala
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                jhala@gmail.com
              </Typography>
              <Typography variant="body2">
                96970879
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
              <UpdateProfileDialog />
              <PasswordChangeDialog />
            </CardActions>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  );
}
