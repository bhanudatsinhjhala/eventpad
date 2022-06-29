import React, { useState } from "react";
import Header from "./Header";
import UserDetailsCard from "./userDetailsCard";
import { QrReader } from "react-qr-reader";
// import Button from "@mui/material/Button";
import "./App.css";
// import { useNavigate} from "react-router-dom";
function QrScanner() {
  const [data, setData] = useState("No result");
  // const navigate = useNavigate();
  const [visiblity, setVisibility] = useState(true);
  function qrData(data) {
    if(data !== null){
      setData(data);
      setVisibility(false);
    }
  }
  return (
    <div>
      <Header />
     { visiblity ? <QrReader
        constraints={{ facingMode: "environment" }}
        scanDelay={500}
        onResult={(result, error) => {
          if (result) {
            console.log(result.text);
            qrData(result.text);
          } else if (error) {
            console.info(error);
            setData("error");
          }
        }}
        videoStyle={{ height: "inherit", margin: "auto", width: "88%", position: "none"}}
        videoContainerStyle={{ paddingTop: "0px", height: "inherit"}}
        className="qrContainer"
        style={{ width: "100%", height: "50vh"}}
      /> : <UserDetailsCard regId={data} /> }
    </div>
  );
}

export default QrScanner;
