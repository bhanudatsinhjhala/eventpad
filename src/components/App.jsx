// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import RegistrationId from "./RegistrationId.jsx";
import QrScanner from "./QrScanner.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import PresenceData from "./PresenceData.jsx";
import Form from "./Form.jsx";
import UploadFile from "./UploadFile.jsx";
import { Routes, Route } from "react-router-dom";
import CreateUsers from "./CreateUsers";
// import QrScan from "./qrScan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/presentdata" element={<PresenceData />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createusers" element={<CreateUsers />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/registrationid" element={<RegistrationId />} />
      <Route path="/qrscan" element={<QrScanner />} />
      <Route path="/uploadfile" element={<UploadFile />} />
    </Routes>
  );
}

export default App;
