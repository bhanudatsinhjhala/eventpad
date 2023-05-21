import axios from "axios";
import qs from "qs";
// import jwt from "jsonwebtoken";
// import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const api_url = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;
// const getJwtToken = async (membershipId) => {
//   try {
//     console.log("membershipId", membershipId);
//     const response = await axios({
//       method: "GET",
//       url: `${api_url}/getjwttoken`,
//       params: {
//         membershipId,
//       },
//     });
//     console.log("response.data", response.data);
//     if (response.status === 200) return;
//   } catch (error) {
//     console.error("catch getJwtToken error", error);
//   }
// };
export const getAllParticipantsList = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getallparticipantslist`,
    });
    console.log("response.data", response.data);
    return response;
  } catch (error) {
    console.error("catch getAllparticipantsList error", error);
    return error;
  }
};
export const getProfile = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getprofile`,
      withCredentials: true,
    });
    console.log("response.data", response.data);
    return response;
  } catch (error) {
    console.error("catch getProfile error", error);
    return error;
  }
};
export const updateProfile = async (data) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `${api_url}/memberdetails`,
      data: qs.stringify(data),
    });
    console.log("response.data", response.data);
    return response;
  } catch (error) {
    console.error("catch getProfile error", error);
    return error;
  }
};
export const resetPassword = async (data) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `${api_url}/resetpassword`,
      data: qs.stringify(data),
    });
    console.log("response.data", response.data);
    return response;
  } catch (error) {
    console.log("catch resetpassword error", error);
    return error;
  }
};
export const verifyAccount = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${api_url}/verify`,
      data: qs.stringify(data),
    });
    console.log("response.data", response);
    return response;
  } catch (error) {
    console.error("catch verify email error", error);
    return error;
  }
};
export const downloadAllParticipantsList = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/downloadallparticipantslist`,
      responseType: "blob",
    });
    return response;
  } catch (error) {
    console.error("catch getAllparticipantsList error", error);
  }
};
// export const checkJwtTokenExpire = async () => {
//   console.log("decodeToken", decodeToken);
//   const expTime = decodeToken.exp;
//   console.log("expTime", expTime);
//   console.log("current Time ", new Date().getTime() / 1000);

//   if (expTime < parseInt(new Date().getTime() / 1000)) {
//     await getJwtToken(decodeToken.membershipId);
//     return true;
//   }
//   return false;
// };
export async function uploadFile(file, eventId) {
  try {
    // console.log(file);
    const formData = new FormData();
    // formData.append("hl", "file");
    formData.append("sheet", file);
    console.log("eventId ====>", eventId);
    const response = await axios({
      method: "POST",
      url: `${api_url}/uploadsheet`,
      params: {
        eventId: eventId,
      },
      data: formData,
    }).then((res, err) => {
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

export async function deleteMember(membershipId) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${api_url}/deletemember`,
      data: {
        membershipId: membershipId,
      },
    });
    return response;
  } catch (error) {
    console.log("delete member error", error);
  }
}
export async function getEventReport(eventId) {
  try {
    console.log("eventId in index.js", eventId);
    // console.log("eventId in index.js", typeOf eventId);
    const response = await axios({
      method: "GET",
      url: `${api_url}/geteventreport`,
      params: {
        eventId: eventId,
      },
      responseType: "blob",
    });
    console.info("get event report ==>", response);
    return response;
  } catch (error) {
    console.log("event report==>", error);
  }
}

export async function deleteEventDetails(eventId) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${api_url}/deleteevent`,
      data: {
        eventId: eventId,
      },
    });

    console.log("Api resp==>", response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventDetails() {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getevent`,
    });
    console.info("get event ===>", response);
    return response;
  } catch (error) {
    console.info(error);
  }
}
export async function getAllMemberDetails() {
  try {
    const response = await axios({
      method: "GET",
      url: `${api_url}/getallmemberdetails`,
    });
    console.info("get member ===>", response);
    return response;
  } catch (error) {
    console.info(error);
  }
}
// export async function verifyjwt() {
//   try {
//     const response = await axios
//       .get(`${api_url}/verifyjwt`, {
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
    return err;
  }
}
// export async function totalAbsent() {
//   try {
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

export async function getUserDetails(id) {
  try {
    const bodyParameters = {
      regId: id,
    };
    const response = await axios({
      method: "GET",
      url: `${api_url}/getuserdetails`,
      params: bodyParameters,
    }).then((res, err) => {
      if (res) {
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

export async function getAllParticipantDetails(eventId) {
  try {
    const bodyParameters = {
      eventId: eventId,
    };
    const response = await axios({
      method: "GET",
      url: `${api_url}/getalluserdetails`,
      withCredentials: true,
      params: bodyParameters,
    }).then((res, err) => {
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
export async function markPresence(id) {
  try {
    const response = await axios({
      method: "PUT",
      url: `${api_url}/markpresence`,
      data: {
        present: true,
        regId: id,
      },
    }).then((res, err) => {
      if (res) {
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
export async function createUsers(user) {
  try {
    const response = await axios({
      method: "POST",
      url: `${api_url}/signup`,
      data: qs.stringify({
        membershipId: parseInt(user.membershipId),
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    }).then((res, err) => {
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

export async function createEvent(event) {
  try {
    const response = await axios({
      method: "POST",
      url: `${api_url}/createevent`,
      data: event,
    }).then((res, err) => {
      if (res) {
        console.info(res);
        return res;
      } else {
        console.info(err);
        return err;
      }
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}
