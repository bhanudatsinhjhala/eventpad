import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
// import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const api_url = process.env.REACT_APP_API_URL;

export async function decodeJwt() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshToken"));
    const decodeToken = jwtDecode(token);
    const currentDate = Date.now();
    console.log(currentDate);
    console.log(decodeToken.exp * 1000);
    if (decodeToken.exp * 1000 + 60 < currentDate) {
        const result = await getAccessToken(
            refreshToken,
            decodeToken.membershipId
        ).then((response) => {
            return response;
        });
        return result;
    }
    return true;
}
async function getAccessToken(refreshToken, membershipId) {
    try {
        console.log(membershipId);
        const response = await axios({
            method: "GET",
            url: `${api_url}/getjwttoken`,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
            params: {
                membershipId: membershipId,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function uploadFile(file, token, eventId) {
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
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        }).then((res, err) => {
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
            method: "DELETE",
            url: `${api_url}/deletemember`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                membershipId: membershipId,
            },
        });
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
                Authorization: `Bearer ${token}`,
            },
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

export async function deleteEventDetails(eventId, token) {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${api_url}/deleteevent`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
export async function getEventDetails(token) {
    try {
        const response = await axios({
            method: "GET",
            url: `${api_url}/getevent`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
                Authorization: `Bearer ${token}`,
            },
        });
        console.info("get member ===>", response);
        return response;
    } catch (error) {
        console.info(error);
    }
}

export async function registerAuthCred() {
    try {
        const membersipId = 96970879;
        const username = "bhanudatsinhjhala";
        const response = await axios({
            method: "POST",
            url: `${api_url}/test`,
            data: qs.stringify({
                membershipId: parseInt(membersipId),
                username: username,
            }),
        }).then((res) => {
            console.info("res ----", res);
            return res;
        });
        return response;
    } catch (error) {
        console.log("registerAuthCred error catch ----", error);
    }
}
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
            regId: id,
        };
        // const config = {
        //   headers: {
        //     "Authorization": `Bearer ${token}`
        //   },
        // }
        const response = await axios({
            method: "GET",
            url: `${api_url}/getuserdetails`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

export async function getAllParticipantDetails(eventId, token) {
    try {
        console.log(token);
        const bodyParameters = {
            eventId: eventId,
        };
        const response = await axios({
            method: "GET",
            url: `${api_url}/getalluserdetails`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
                Authorization: `Bearer ${token}`,
            },
            data: {
                present: true,
                regId: id,
            },
        }).then((res, err) => {
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
            method: "POST",
            url: `${api_url}/signup`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: qs.stringify({
                membershipId: parseInt(user.membershipId),
                role: user.role,
                email: user.email,
                password: user.password,
                name: user.name,
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

export async function createEvent(event, token) {
    try {
        const response = await axios({
            method: "POST",
            url: `${api_url}/createevent`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
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