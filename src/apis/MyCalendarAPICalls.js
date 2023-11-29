import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../modules/CookieModule";
import { GET_CALENDAR_CONTENT, GET_CALENDAR_DELETE, GET_CALENDAR_MODIFY, GET_CALENDAR_REGIST } from "../modules/MyCalendarModule";

export const comIp = "localhost";

export const callGetMyCalendarContentAPI = () => {
    const requestURL = `http://${comIp}:8000/users/${jwtDecode(getCookie("accessToken")).userCode}/myCalendar`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        }).then(
            result => result.data.results.myCalendarList
        );

        dispatch({ type: GET_CALENDAR_CONTENT, payload: result});
    };
}

export const callMyCalendarRegistAPI = (calendarContent, calendarDate) => {
    let requestURL = `http://${comIp}:8000/myCalendar`;

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {
            headers: {
                "Accept": "*/*",
            },
            refUserCode: jwtDecode(getCookie("accessToken")).userCode,
            calendarContent: calendarContent,
            calendarDate: calendarDate
        }
        ).then(response => response);
        // dispatch({ type: GET_CALENDAR_REGIST, payload: result});
    };
}

export const callMyCalendarModifyAPI = (calendarContent, calendarDate, myCalendarCode) => {
    let requestURL = `http://${comIp}:8000/myCalendar/${myCalendarCode}`;

    return async (dispatch, getState) => {
        const result = await axios.put(requestURL, {
            headers: {
                "Accept": "*/*",
            },
            myCalendarCode: myCalendarCode,
            calendarContent: calendarContent,
            calendarDate: calendarDate,
        }
        ).then(response => response);
        // dispatch({ type: GET_CALENDAR_MODIFY, payload: result});
    };
}

export const callMyCalendarDeleteAPI = myCalendarCode => {
    let requestURL = `http://${comIp}:8000/myCalendar/${myCalendarCode}`;
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {
            headers: {
                "Accept": "*/*",
            }
        }
        ).then(response => response);
        // dispatch({ type: GET_CALENDAR_DELETE, payload: result});
    };
}