import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const api_url = process.env.REACT_APP_API_URL;

export async function verifyjwt(token) {
  const response = await axios.get(
    `${api_url}/api/verifyjwt`,
    {
      params: {
        token: token,
      },
    },
    (req, res) => {
      try {
        // console.log(res);
        return res;
      } catch (err) {
        // console.log(err, "25");
        return err;
      }
    }
  );
  return response;
}
export async function loginUser(user) {
  const membershipId = parseInt(user.membershipId);
  // console.log(user);
  const response = await axios.get(
    `${api_url}/api/login`,
    {
      params: {
        membershipId: membershipId,
        password: user.password,
      },
    },
    (req, res) => {
      try {
        // console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  );
  return response;
}
export async function getUserDetails(id) {
  const response = await axios.get(
    `${api_url}/api/getuserdetails`,
    {
      params: {
        regId: id,
      },
    },
    (req, res) => {
      try {
        // console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  return response;
}
export async function markPresence(id) {
  // console.log("present", user.present);
  // console.log("present", id);
  // const present = user.present;
  // const regId = user.regId;
  const response = await axios.put(
    `${api_url}/api/markpresence`,
    {
      present: true,
      regId: id,
    },
    (req, res) => {
      try {
        // console.log(res);
        return res;
      } catch (err) {
        console.log(err);
      }
    }
  );
  return response;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
