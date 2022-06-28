import React from "react";
import Header from "./Header";
// import { QrReader } from "react-qr-reader";
function QrScanner() {
  // const [data, setData] = useState("No result");
  return (
    <div>
      <Header />
      {/* <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      /> */}
      <p style={{ marginTop: "200px" }}>QRScanner</p>
    </div>
  );
}

export default QrScanner;
