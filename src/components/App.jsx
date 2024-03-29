// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import RegistrationId from "./RegistrationId.jsx";
import QrScanner from "./QrScanner.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Participants from "./Participants.jsx";
// import PresenceData from "./PresenceData.jsx";
// import QrGenerate from "./qrGenerate.jsx";
// import Form from "./Form.jsx";
import Profile from "./Profile.jsx";
import Event from "./Event.jsx";
// import UploadFile from "./UploadFileDialog.jsx";
import { Routes, Route } from "react-router-dom";
import CreateUsers from "./CreateUsers";
import VerifyAccount from "./VerifyAccount.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/presentdata" element={<PresenceData />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={<VerifyAccount />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/participants" element={<Participants />} />
      <Route path="/createusers" element={<CreateUsers />} />
      <Route path="/event" element={<Event />} />
      <Route path="/registrationid" element={<RegistrationId />} />
      <Route path="/qrscan" element={<QrScanner />} />
      {/* <Route path="/Form" element={<Form />} /> */}
      {/* <Route path="/uploadfile" element={<UploadFile />} /> */}
      {/* <Route path="/getQr" element={<QrGenerate />} /> */}
    </Routes>
  );
}

export default App;
