import React, { useState } from "react";
import Header from "./Header";
import { QrReader } from "react-qr-reader";
import Button from "@mui/material/Button";
import "./App.css";
// import { useNavigate} from "react-router-dom";
function QrScanner() {
  const [data, setData] = useState("No result");
  const [res, setRes] = useState("No result");
  // const navigate = useNavigate();
  // var visible = true;
  function handleClick() {
    setRes(data);
    console.log(res);
    // console.log(visible);
    // navigate("/scannerDetails")
  }
  function deleteRes() {
    setRes("");
  }
  return (
    <div>
      <Header />
      <QrReader
        constraints={{ facingMode: "environment" }}
        scanDelay={500}
        onResult={(result, error) => {
          if (result) {
            console.log(result.text);
            setData(result.text);
          } else if (error) {
            console.info(error);
            setData("error");
          }
        }}
        className="qrContainer"
        style={{ width: "100%", height: "50vh", marginTop: "90px" }}
      />
      <Button style={{ marginTop: "200px" }} onClick={handleClick}>
        QRScanner
      </Button>
      <Button style={{ marginTop: "200px" }} onClick={deleteRes}>
        Delete result
      </Button>
      {/* {res.map((value, index) => {
        return <p key={index}> {value} </p>;
      })} */}
      <p> {res}</p>
    </div>
  );
}

export default QrScanner;
