import React from "react";
import Header from "./Header";
import { QrReader } from "react-qr-reader";
// import { useNavigate} from "react-router-dom";
function QrScanner() {
  // const [data, setData] = useState("No result");
// const navigate = useNavigate();
var visible= true;
  function handleClick(res){
    visible=false;
    console.log(visible);
    // navigate("/scannerDetails")
  }
  return (
    <div>
      <Header />
     { visible ? <QrReader
        onResult={(result, error) => {
          if (result) {
            console.log(result.text)
            handleClick(result.text);
          }else if (error) {
            console.info(error);
            // setData("error")
          }
        }}
        style={{ width: "100%" }}
      /> : <div>{{visible}}</div>
     }
      <p onClick={{handleClick}} style={{ marginTop: "200px" }}>QRScanner</p>
      <p></p>
    </div>
  );
}

export default QrScanner;
