import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import axios from "axios";
import qs from "qs";
import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const api_url = process.env.REACT_APP_API_URL;

export async function uploadFile(file) {
  try {
    var verifyres = await verifyjwt(sessionStorage.getItem("token"));
    if (verifyres.status === 200) {
      // console.log(file);
      const formData = new FormData();
      formData.append("hl", "file");
      formData.append("file", file);
      // console.log(formData);
      const response = await axios
        .post(`${api_url}/api/uploadsheet`, formData)
        .then((res, err) => {
          if (res) {
            // console.log(file);
            // console.log(res);
            return res;
          } else {
            console.log(err);
            return err;
          }
        });
      return response;
    } else {
      // console.log(verifyres);
      return verifyres;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function verifyjwt(token) {
  try {
    const response = await axios
      .get(`${api_url}/api/verifyjwt`, {
        params: {
          token: token,
        },
      })
      .then((res, err) => {
        if (res) {
          // console.log(res);
          return res;
        } else {
          // console.log(err, "25");
          return err;
        }
      });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function loginUser(user) {
  try {
    const membershipId = parseInt(user.membershipId);
    // console.log(user);
    const response = await axios
      .get(`${api_url}/api/login`, {
        params: {
          membershipId: membershipId,
          password: user.password,
        },
      })
      .then((res, err) => {
        try {
          // console.log(res);
          return res;
        } catch (err) {
          console.log(err);
          return err;
        }
      });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function totalAbsent() {
  try {
    var verifyres = await verifyjwt(sessionStorage.getItem("token"));
    if (verifyres.status === 200) {
      const response = await axios
        .get(`${api_url}/api/totalabsent`)
        .then((res, err) => {
          if (res) {
            return res;
          } else {
            console.log(err);
          }
        });
      return response;
    } else {
      // console.log(verifyres);
      return verifyres;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDetails(id) {
  try {
    var verifyres = await verifyjwt(sessionStorage.getItem("token"));
    if (verifyres.status === 200) {
      const response = await axios
        .get(`${api_url}/api/getuserdetails`, {
          params: {
            regId: id,
          },
        })
        .then((res, err) => {
          if (res) {
            // console.log(res.data);
            return res;
          } else {
            console.log(err);
            return err;
          }
        });
      return response;
    } else {
      // console.log(verifyres);
      return verifyres;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function markPresence(id) {
  try {
    var verifyres = await verifyjwt(sessionStorage.getItem("token"));
    if (verifyres.status === 200) {
      // console.log("present", user.present);
      // console.log("present", id);
      // const present = user.present;
      // const regId = user.regId;
      const response = await axios
        .put(`${api_url}/api/markpresence`, {
          present: true,
          regId: id,
        })
        .then((res, err) => {
          if (res) {
            // console.log(res);
            return res;
          } else {
            console.log(err);
            return err;
          }
        });
      return response;
    } else {
      // console.log(verifyres);
      return verifyres;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function createUsers(user) {
  try {
    var verifyres = await verifyjwt(sessionStorage.getItem("token"));
    if (verifyres.status === 200) {
      // const formData = new FormData();
      // formData.append("membershipId", parseInt(user.membershipId));
      // formData.append("email", user.email);
      // formData.append("password", user.password);
      // formData.append("role", user.role);
      const response = await axios
        .post(
          `${api_url}/api/signup`,
          qs.stringify({
            membershipId: parseInt(user.membershipId),
            role: user.role,
            email: user.email,
            password: user.password,
          })
        )
        .then((res, err) => {
          if (res) {
            console.log(res);
            return res;
          } else {
            console.log(err);
            return err;
          }
        });
      return response;
    } else {
      // console.log(verifyres);
      return verifyres;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
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
