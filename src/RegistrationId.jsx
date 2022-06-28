import React from "react";
import "./App.css";
import Header from "./Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";

function RegistrationId() {
  return (
    <div>
      <Container>
        <Header />
        <Container mt={2}>
          <Box component="form" className="regForm">
            <h1>Registration Id</h1>
            <Stack direction="row" spacing={3}>
              <TextField />
              <Button className="submitBtn" variant="contained">
                Mark Presence
              </Button>
            </Stack>
          </Box>
          <Box
            component="card"
            style={{
              margin: "auto",
              width: "fit-content",
            }}
          >
            <div
              style={{
                margin: "5rem auto",
                padding: "10px",
                borderRadius: "3% 3% 3% 3% / 6% 6% 6% 6% ",
                border: "1px solid #c9c4c4",
                width: "fit-content",
              }}
            >
              <div style={{ margin: "1rem" }}>
                <Typography m={2} variant="h5" style={{ display: "inline" }}>
                  Name:
                </Typography>
                <Typography variant="h5" style={{ display: "inline" }}>
                  Bhanudatsinh Jhala
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography m={2} variant="h5" style={{ display: "inline" }}>
                  RegistrationId:
                </Typography>
                <Typography variant="h5" style={{ display: "inline" }}>
                  1234
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography m={2} variant="h5" style={{ display: "inline" }}>
                  Seat No:
                </Typography>
                <Typography variant="h5" style={{ display: "inline" }}>
                  20
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Button
                  variant="outlined"
                  style={{ marginLeft: "1rem" }}
                  color="success"
                >
                  <DoneIcon style={{ marginRight: "10px" }} />
                  Mark Presence
                </Button>
              </div>
            </div>
          </Box>
        </Container>
      </Container>
    </div>
  );
}

export default RegistrationId;
