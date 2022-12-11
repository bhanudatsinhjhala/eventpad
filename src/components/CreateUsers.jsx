import React, { useState, useEffect } from "react";
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
import CreateUsersForm from "./CreateUsersForm.jsx";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function CreateUsers() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, []);
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
    <div>
      <Header />
      <Container class="createFormUser">
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
            <CardContent sx={{ maxWidth: 280, margin: "20px auto", paddingBottom: '0px' }}>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Create Volunteers Accounts
              </Typography>

              <Box>
                <CreateUsersForm changeSnackText={changeSnackText} />
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
    </div>
  );
}

export default CreateUsers;
