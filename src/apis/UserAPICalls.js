import {
  POST_LOGIN,
  POST_JOIN,
  GET_USERS,
  DELETE_USERS,
  POST_USERS,
} from "../modules/UserModule";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../modules/CookieModule";

import axios from "axios";
import { navigate } from "react-big-calendar/lib/utils/constants";

const cookies = new Cookies();
const COOKIE_NAME = "accessToken";

export const callLoginAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/login`;

  console.log("form : ", form);

  return async (dispatch, getState) => {
    try {
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: form.id,
          pwd: form.pwd,
        }),
      }).then((response) => response.json());

      console.log("result : ", result);

      console.log("[UserAPICalls] callLoginAPI RESULT : ", result.failType);

      if (result.status === 200) {
        cookies.set(COOKIE_NAME, result.data.accessToken, { path: "/" });
        cookies.set(COOKIE_NAME, result.data.accessToken, { path: "/" });
        alert("로그인 완료");
      } else if (result.failType === "아이디 또는 비밀번호가 틀립니다.") {
        alert("아이디 또는 비밀번호가 틀립니다.");
      } else if (
        result.failType === "예상치 못한 오류입니다. 관리자에게 문의하세요..."
      ) {
        alert("존재하지 않은 계정입니다.");
      } else if (
        result.failType === "탈퇴한 회원입니다. 로그인이 불가능합니다."
      ) {
        alert("탈퇴한 계정입니다.");
      }

      dispatch({ type: POST_LOGIN, payload: result });
    } catch (error) {
      console.error("[UserAPICalls] callLoginAPI Error:", error.message);
    }
  };
};

export const callLogoutAPI = () => {
  return (dispatch) => {
    cookies.remove(COOKIE_NAME, { path: "/" });

    dispatch({ type: POST_LOGIN, payload: "" });
    console.log("[UserAPICalls] callLogoutAPI RESULT : SUCCESS");
  };
};

export const callJoinAPI = ({ userData }) => {
  console.log("userData", userData);

  return async (dispatch) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/join`;

    console.log("userData", userData);

    const formData = new FormData();
    formData.append("id", userData.id);
    console.log("id", userData.id);
    formData.append("pwd", userData.pwd);
    console.log("pwd", userData.pwd);
    formData.append("nickname", userData.nickname);
    console.log("nickname", userData.nickname);
    formData.append("name", userData.name);
    console.log("name", userData.name);
    formData.append("birthDate", userData.birthDate);
    console.log("birthDate", userData.birthDate);
    formData.append("gender", userData.gender);
    console.log("gender", userData.gender);
    formData.append("email", userData.email);
    console.log("email", userData.email);
    formData.append("phone", userData.phone);
    console.log("phone", userData.phone);
    formData.append("imageFile", userData.imageFile);
    console.log("imageFile", userData.imageFile);

    console.log("formData", formData);

    try {
      const response = await fetch(requestURL, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();

      dispatch({ type: POST_JOIN, payload: data });
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      dispatch({ type: "JOIN_FAILURE", payload: error });
    }
  };
};

export const callGetUserAPI = () => {
  const userCode = jwtDecode(getCookie("accessToken")).userCode;
  const userCodeConvertInt = parseInt(userCode, 10);
  console.log("jwtDecode userCode", userCode);
  console.log("jwtDecode userCodeConvertInt", userCodeConvertInt);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/${userCodeConvertInt}`;

  console.log("requestURL", requestURL);

  return async (dispatch, getState) => {
    console.log("Authorization", `Bearer ${getCookie("accessToken")}`);

    const response = await axios
      .get(requestURL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((data) => {
        dispatch({ type: GET_USERS, payload: data });
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
        dispatch({ type: "USERS_FAILURE", payload: error });
      });
  };
};

export const callDeleteUserAPI = () => {
  const userCode = jwtDecode(getCookie("accessToken")).userCode;
  const userCodeConvertInt = parseInt(userCode, 10);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/${userCodeConvertInt}`;

  console.log("requestURL", requestURL);

  return async (dispatch, getState) => {
    console.log("Authorization", `Bearer ${getCookie("accessToken")}`);

    const response = await axios
      .delete(requestURL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((data) => {
        console.error("탈퇴 성공:", data);
        dispatch({ type: DELETE_USERS, payload: data });
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
        dispatch({ type: "USERS_FAILURE", payload: error });
      });
  };
};

export const callUpdateUserAPI = ({ updatedData }) => {
  const userCode = jwtDecode(getCookie("accessToken")).userCode;
  const userCodeConvertInt = parseInt(userCode, 10);

  console.log("userCode", userCode);
  console.log("userCodeConvertInt", userCodeConvertInt);

  return async (dispatch) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/${userCodeConvertInt}`;

    console.log("requestURL : ", requestURL);

    console.log("userData", updatedData);

    const formData = new FormData();
    formData.append("profileImage", updatedData.profileImage);
    console.log("profileImage", updatedData.profileImage);
    formData.append("nickname", updatedData.nickname);
    console.log("nickname", updatedData.nickname);
    formData.append("newPassword", updatedData.newPassword);
    console.log("newPassword", updatedData.newPassword);
    formData.append("newPasswordConfirm", updatedData.newPasswordConfirm);
    console.log("newPasswordConfirm", updatedData.newPasswordConfirm);

    console.log("formData", formData.append);

    try {
      const response = await fetch(requestURL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: POST_USERS, payload: data });
      } else {
        dispatch({ type: "POST_USERS_FAILURE", payload: data });
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      dispatch({ type: "POST_USERS_FAILURE", payload: error });
    }
  };
};

export const callDuplicatedUserIdAPI = (id) => {
  console.log("callDuplicatedUserIdAPI start");
  console.log("callDuplicatedUserIdAPI id", id);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/checkId`;

  return async (dispatch) => {
    try {
      const response = await axios.get(requestURL, {
        params: { id: id },
        headers: {
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in callDuplicatedUserIdAPI:", error);
      dispatch({
        type: "DUPLICATE_USER_ID_FAILURE",
        payload: { isUnique: false },
      });
    }
  };
};
export const callDuplicatedNicknameAPI = (nickname) => {
  console.log("callDuplicatedNicknameAPI start");
  console.log("callDuplicatedNicknameAPI nickname", nickname);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/checkNickname?nickname=${nickname}`;

  return async (dispatch) => {
    try {
      const response = await axios.get(requestURL);
      console.log("Response Status:", response.status);

      return response;
    } catch (error) {
      console.error("Error in callDuplicatedNicknameAPI:", error);
      dispatch({
        type: "DUPLICATE_NICKNAME_FAILURE",
        payload: { isUnique: false },
      });
    }
  };
};

export const callPostIdAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/findId`;

  return async (dispatch) => {
    try {
      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: form.name,
          gender: form.gender,
          birthDate: form.birthDate,
        }),
      }).then((response) => response.json());

      console.log("Response Status:", response.status);
      console.log("Response ", response);

      return response;

    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      dispatch({ type: "USERS_FAILURE", payload: error });
    }
  };
};

export const callPostPwdAPI = ({ userData,form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8000/users/changePwd`;

  return async (dispatch) => {
    try {
      const response = await fetch(requestURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: userData,
          newPassword: form.newPwd,
          newPasswordConfirm : form.newPwdConfirm,
        }),
      }).then((response) => response.json());

      console.log("Response Status:", response.status);
      console.log("Response ", response);

      return response;

    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      dispatch({ type: "USERS_FAILURE", payload: error });
    }
  };
};
