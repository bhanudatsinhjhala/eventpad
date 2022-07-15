import React from "react";
import Header from "./Header.jsx";
import {
  Container,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { presenceData } from "..";

export default function PresentData() {
  function handleClick() {
    presenceData().then((res) => {
      console.log(res);
    });
  }
  return (
    <div>
      <Header />
      <Container sx={{ margin: 12 }}>
        <h1>Presence Data</h1>
        <Card
          sx={{ maxWidth: 345, cursor: "pointer" }}
          onClick={() => {
            handleClick();
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
      </Container>
    </div>
  );
}
