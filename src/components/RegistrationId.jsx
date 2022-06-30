import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import UserDetailsCard from "./userDetailsCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import DoneIcon from "@mui/icons-material/Done";
// import { getUserDetails } from "../index.js";
function RegistrationId() {
  const [regid, setRegid] = useState();
  // const [userDetails, setUserDetails] = useState({
  //   name: "",
  //   email: "",
  //   regId: "",
  //   seatNo: "",
  //   present: "",
  //   _id: "",
  //   __v: "",
  // });
  const [data, setData] = useState();
  const [visiblity, setVisibility] = useState(true);
  const changeVis = (value) => {
    setVisibility(value);
  };
  function handleChange(e) {
    console.log(e.target.value);
    setRegid(e.target.value);
  }
  function formSubmit(e) {
    e.preventDefault();
    console.log(regid);
    // getUserDetails(regid).then((res) => {
    //   console.log(res.data[0]);
    setData(regid);
    changeVis(false);
    // });
    setRegid("");
  }
  // function handlePresent() {
  //   console.log(true);
  //   console.log(userDetails);
  //   markPresence(userDetails.regId).then((res) => {
  //     // console.log(res.data.acknowledged);
  //     if (res.data.acknowledged === true) {
  //       setUserDetails({
  //         name: "",
  //         email: "",
  //         regId: "",
  //         seatNo: "",
  //         present: "",
  //         _id: "",
  //         __v: "",
  //       });
  //     }
  //   });
  // }
  return (
    <div>
      <Container>
        <Header />
        <Container mt={2}>
          {visiblity ? (
            <Box component="form" className="regForm">
              <h1>Registration Id</h1>
              <Stack direction="row" spacing={3}>
                <TextField name="regid" value={regid} onChange={handleChange} />
                <Button
                  className="submitBtn"
                  onClick={formSubmit}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          ) : (
            <UserDetailsCard regId={data} changeVis={changeVis} />
          )}
        </Container>
      </Container>
    </div>
  );
}

export default RegistrationId;
