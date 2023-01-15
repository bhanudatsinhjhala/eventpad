import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter
} from "react-router-dom";
import App from "./components/App";
import axios from "axios";
import qs from "qs";
// import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const api_url = process.env.REACT_APP_API_URL;
export async function uploadFile(file, token, eventId) {
  try {
    // console.log(file);
    const formData = new FormData();
    // formData.append("hl", "file");
    formData.append("sheet", file);
    console.log("eventId ====>", eventId);
    const response = await axios({
        method: 'POST',
        url: `${api_url}/uploadsheet`,
        params: {
          eventId: eventId
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: formData
      })
      .then((res, err) => {
        if (res) {
          // console.log(file);
          console.log(res);
          return res;
        } else {
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

export async function deleteMember(membershipId, token) {
  try {
    const response = await axios({
      "method": "DELETE",
      "url": `${api_url}/deletemember`,
      "headers": {
        "Authorization": `Bearer ${token}`
      },
      data: {
        membershipId: membershipId
      }
    })
    return response;
  } catch (error) {
    console.log("delete member error", error);
  }
}
export async function getEventReport(eventId, token) {
  try {
    console.log("eventId in index.js", eventId);
    // console.log("eventId in index.js", typeOf eventId);
    const response = await axios({
      method: "GET",
      url: `${api_url}/geteventreport`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        eventId: eventId
      },
      responseType: 'blob'
    });
    console.info("get event report ==>", response);
    return response;
  } catch (error) {
    console.log("event report==>", error);
  }
}

export async function deleteEventDetails(eventId, token) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${api_url}/deleteevent`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        eventId: eventId,
      }
    });

    console.log("Api resp==>", response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventDetails(token) {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getevent`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    console.info("get event ===>", response);
    return response;
  } catch (error) {
    console.info(error);
  }
}
export async function getAllMemberDetails(token) {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getallmemberdetails`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    console.info("get member ===>", response);
    return response;
  } catch (error) {
    console.info(error);
  }
}
// export async function verifyjwt(token) {
//   try {
//     const response = await axios
//       .get(`${api_url}/verifyjwt`, {
//         params: {
//           token: token,
//         },
//       })
//       .then((res, err) => {
//         if (res) {
//           // console.log(res);
//           return res;
//         } else {
//           // console.log(err, "25");
//           return err;
//         }
//       });
//     return response;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// }
export async function loginUser(user) {
  try {
    const membershipId = parseInt(user.membershipId);
    // console.log(user);
    const response = await axios
      .post(`${api_url}/login`, {
        membershipId: membershipId,
        password: user.password,
      })
      .then((res) => {
        console.info("index resp===>", res);
        return res;
      });
    return response;
  } catch (err) {
    console.error(err);
    loginUser(user);
  }
}
// export async function totalAbsent() {
//   try {
//     var verifyres = await verifyjwt(sessionStorage.getItem("token"));
//     if (verifyres.status === 200) {
//       const response = await axios
//         .get(`${api_url}/totalAbsent`)
//         .then((res, err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(res);
//             return res;
//           }
//           return response;
//         });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function qrGenerate(membershipId) {

//   try {
//     const response = await axios(`${api_url}/qrgenerate/${membershipId}`)
//       .then((res, err) => {
//         if (res) {
//           return res;
//         } else {
//           console.log(err);
//         }
//       })
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
export async function totalAbsent() {
  try {
    const response = await axios
      .get(`${api_url}/totalabsent`)
      .then((res, err) => {
        if (res) {
          return res;
        } else {
          console.log(err);
        }
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDetails(id, token) {
  try {
    console.log(token);
    const bodyParameters = {
      regId: id
    }
    // const config = {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   },
    // }
    const response = await axios({
        method: "GET",
        url: `${api_url}/getuserdetails`,
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: bodyParameters,
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
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function markPresence(id, token) {
  try {
    console.log(token);
    // console.log("present", user.present);
    // console.log("present", id);
    // const present = user.present;
    // const regId = user.regId;
    const response = await axios({
        method: "PUT",
        url: `${api_url}/markpresence`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          present: true,
          regId: id,
        }
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
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function createUsers(user, token) {
  try {
    // const formData = new FormData();
    // formData.append("membershipId", parseInt(user.membershipId));
    // formData.append("email", user.email);
    // formData.append("password", user.password);
    // formData.append("role", user.role);
    const response = await axios({
        method: 'POST',
        url: `${api_url}/signup`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: qs.stringify({
          membershipId: parseInt(user.membershipId),
          role: user.role,
          email: user.email,
          password: user.password,
          name: user.name
        })
      })
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
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function createEvent(event, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${api_url}/createevent`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: event
    }).then((res, err) => {
      if (res) {
        console.info(res);
        return res;
      } else {
        console.info(err);
        return err;
      }
    })
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( <
  BrowserRouter >
  <
  App / >
  <
  /BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();