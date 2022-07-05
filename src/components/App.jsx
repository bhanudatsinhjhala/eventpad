// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import RegistrationId from "./RegistrationId.jsx";
import QrScanner from "./QrScanner.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import UploadFile from "./UploadFile.jsx";
import { Routes, Route } from "react-router-dom";
// import QrScan from "./qrScan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrationid" element={<RegistrationId />} />
      <Route path="/qrscan" element={<QrScanner />} />
      <Route path="/uploadfile" element={<UploadFile />} />
    </Routes>
  );
}

export default App;
