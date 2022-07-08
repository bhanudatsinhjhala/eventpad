import React from "react";
import Header from "./Header";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FullScreen from "@mui/icons-material/Fullscreen";
import { verifyjwt } from "..";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  async function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      await verifyjwt(token).then((res) => {
        // console.log(res.request);
        if (res.request.status !== 200) {
          navigate("/login");
        }
      });
    }
  }
  useEffect(() => {
    isAuthenticated();
    //eslint-disable-next-line
  }, []);
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
              <Typography variant="body1" color="text.secondary">
                <IconButton>
                  <Edit></Edit>
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
              <Typography variant="body1" color="text.secondary">
                <IconButton>
                  <FullScreen></FullScreen>
                </IconButton>
                QR Scanner
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
