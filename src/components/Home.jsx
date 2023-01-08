import React from "react";
import Header from "./Header";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grow from "@mui/material/Grow";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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
    </div>
  );
}

export default Home;
