import React, {useState} from "react";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { getUserDetails, markPresence } from "../index.js";
function userDetailsCard(props){
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        regId: "",
        seatNo: "",
        _id: "",
        __v: "",
      });
    getUserDetails(props.regId).then((res) => {
        console.log(res.data[0]);
        setUserDetails(res.data[0]);
      });
      function handlePresent() {
        console.log(true);
        markPresence(true);
      }
    return(
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
                  {userDetails.name}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography m={2} variant="h5" style={{ display: "inline" }}>
                  RegistrationId:
                </Typography>
                <Typography variant="h5" style={{ display: "inline" }}>
                  {props.regId}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Typography m={2} variant="h5" style={{ display: "inline" }}>
                  Seat No:
                </Typography>
                <Typography variant="h5" style={{ display: "inline" }}>
                  {userDetails.seatNo}
                </Typography>
              </div>
              <div style={{ margin: "1rem" }}>
                <Button
                  variant="outlined"
                  style={{ marginLeft: "1rem" }}
                  color="success"
                  onClick={handlePresent}
                >
                  <DoneIcon style={{ marginRight: "10px" }} />
                  Mark Presence
                </Button>
              </div>
            </div>
          </Box>
    )
}

export default userDetailsCard;