import React, { useState } from "react";
import "./App.css";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Snackbar,
  Grow,
} from "@mui/material";
import LoginForm from "./LoginForm.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function Loginqr() {
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
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
    <Container>
      <Grow in={true} {...(true ? { timeout: 1300 } : {})}>
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
          elevation={10}
        >
          <CardContent sx={{ maxWidth: 280, margin: "20px auto" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Welcome, to IEEE Event Attendance System
            </Typography>

            <Box>
              <LoginForm changeSnackText={changeSnackText} />
            </Box>
          </CardContent>
        </Card>
      </Grow>
      <Snackbar
        className="regSnack"
        open={open}
        onClose={handleClose}
        message={snackText}
        action={action}
      />
    </Container>
  );
}

export default Loginqr;
