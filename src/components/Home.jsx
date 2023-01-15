import React from "react";
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles';
import { yellowColorTheme } from "../colorTheme.js";
import { CardContent, CssBaseline, Typography, Stack, Grow, Container, Card, IconButton } from "@mui/material";
import FullScreen from "@mui/icons-material/Fullscreen";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const navigate = useNavigate();
  function handleClick(value) {
    if (value === "reg") {
      navigate("/registrationid");
    } else {
      navigate("/qrscan");
    }
    // console.log("clicked", value);
  }
  return (
    <div>
      <Header />
      <ThemeProvider theme={yellowColorTheme} >
        <CssBaseline />
        <Container sx={{ margin: "auto", marginTop: "100px" }}>
          <Grow in="true" {...(true ? { timeout: 1300 } : {})}>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={5}
              sx={{ margin: "auto", height: "70vh" }}
            >
              <Card
                sx={{ maxWidth: 345, cursor: "pointer" }}
                onClick={() => {
                  handleClick("reg");
                }}
              >
                <CardContent>
                  <Typography variant="body1" color="#ffa306">
                    <IconButton>
                      <Edit sx={{ color: "#ffa306" }} />
                    </IconButton>
                    Registration ID
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{ maxWidth: 345, cursor: "pointer" }}
                onClick={() => {
                  handleClick("qr");
                }}
              >
                <CardContent>
                  <Typography variant="body1" color="#ffa306">
                    <IconButton>
                      <FullScreen sx={{ color: "#ffa306" }} />
                    </IconButton>
                    QR Scanner
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grow>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Home;
