import axios from "axios";
import qs from "qs";
// import jwt from "jsonwebtoken";
// import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_API_URL = `${API_URL}/admin`;
axios.defaults.withCredentials = true;

export const getAllParticipantsList = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${ADMIN_API_URL}/getallparticipantslist`,
    });
    return response;
  } catch (error) {
    console.error("catch getAllparticipantsList error", error);
    return error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${ADMIN_API_URL}/check-auth`,
    });
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
      url: `${ADMIN_API_URL}/getprofile`,
      withCredentials: true,
    });
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
      url: `${ADMIN_API_URL}/memberdetails`,
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
      url: `${ADMIN_API_URL}/resetpassword`,
      data: qs.stringify(data),
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const verifyAccount = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${ADMIN_API_URL}/verify`,
      data: qs.stringify(data),
    });
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
      url: `${ADMIN_API_URL}/downloadallparticipantslist`,
      responseType: "blob",
    });
    return response;
  } catch (error) {
    console.error("catch getAllparticipantsList error", error);
  }
};
export async function uploadFile(file, eventId) {
  try {
    const formData = new FormData();
    formData.append("sheet", file);
    const response = await axios({
      method: "POST",
      url: `${ADMIN_API_URL}/uploadsheet`,
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
      url: `${ADMIN_API_URL}/deletemember`,
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
    const response = await axios({
      method: "GET",
      url: `${ADMIN_API_URL}/geteventreport`,
      params: {
        eventId: eventId,
      },
      responseType: "blob",
    });
    return response;
  } catch (error) {
    console.log("event report==>", error);
  }
}

export async function deleteEventDetails(eventId) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${ADMIN_API_URL}/deleteevent`,
      data: {
        eventId: eventId,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventDetails() {
  try {
    const response = await axios({
      method: "GET",
      url: `${ADMIN_API_URL}/getevent`,
    });
    return response;
  } catch (error) {
    console.info(error);
  }
}
export async function getAllMemberDetails() {
  try {
    const response = await axios({
      method: "GET",
      url: `${ADMIN_API_URL}/getallmemberdetails`,
    });
    return response;
  } catch (error) {
    console.info(error);
  }
}
export async function loginUser(user) {
  try {
    const membershipId = parseInt(user.membershipId);
    const response = await axios
      .post(`${ADMIN_API_URL}/login`, {
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
export async function totalAbsent() {
  try {
    const response = await axios
      .get(`${ADMIN_API_URL}/totalabsent`)
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
      url: `${ADMIN_API_URL}/getuserdetails`,
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
      url: `${ADMIN_API_URL}/getalluserdetails`,
      withCredentials: true,
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
export async function markPresence(id) {
  try {
    const response = await axios({
      method: "PUT",
      url: `${ADMIN_API_URL}/markpresence`,
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
      url: `${ADMIN_API_URL}/signup`,
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
      url: `${ADMIN_API_URL}/createevent`,
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
