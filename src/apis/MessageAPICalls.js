import axios from 'axios';
import{
    POST_MESSAGES,
    GET_MESSAGES,
    GET_MESSAGES_MSGCODE,
    GET_MESSAGES_ISRECEIVED,
    DELETE_MESSAGES_MSGCODE,
    GET_MESSAGES_KEYWORD
} from '../modules/MessageModule.js';
import { getCookie } from '../modules/CookieModule.js';
import { jwtDecode } from 'jwt-decode';
import { timestamp } from '../modules/MyCalendarModule.js';


export const callMessageRegistAPI = ({form}) => {
    console.log('[MessageAPICalls] callMessageRegistAPI Call');
    console.log(new Date(timestamp()))

    const requestURL = `http://localhost:8000/messages`;
   // const date = new Date();
    //let date = timestamp(new Date()).substring(0, 20); 
   // console.log("Date:!!!!!!!!!!!!!!!!!!!!!! " + date)
    //let today = new Date().setHours(today.getHours() + 9);

    let today = new Date();
    today.setHours(today.getHours() + 18);
    today = today.toISOString().replace('T', ' ').substring(0, 19);
    today = new Date(today);

    return async (dispatch, getState) => {

        const result = await axios.post(requestURL, {
       
            msgCode: form.get('msgCode'),
            msgContent: form.get('msgContent'),
            msgStatus: "N",
            msgTime: today,
            refProductCode: form.get('refProductCode'),
            senderCode: form.get('senderCode'),
            receiverCode: form.get('receiverCode'),
            msgDeleteInfoMsgDeleteDTO: {
                    msgDeleteCode: 1,
                    msgDeleteStatus: "N"
            }, 
            method: "POST",
            headers: {
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            },
            body: form
        })
        console.log('[MessageAPICalls] callMessageRegistAPI RESULT : ', result);

        dispatch({type: POST_MESSAGES, payload: result});
        return result;
    }

}



export const callMessageDetailAPI = ({msgCode}) => {
    console.log('[MessageAPICalls] callMessageDetailAPI CALL');

    const requestURL = `http://localhost:8000/messages/${msgCode}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        })

        console.log('[MessageAPICalls] callMessageDetailAPI RESULT', result);
        if(result.status == 200){
            console.log('[MessageAPICalls] callMessageDetailAPI SUCCESS');
            dispatch({type: GET_MESSAGES_MSGCODE, payload: result.data});
            return result;
        }
    }
}


export const callMessageListAPI = ({userCode, isReceived, page, keyword}) => {
    console.log('[MessageAPICalls] callMessageListAPI CALL');


    let requestURL = `http://localhost:8000/users/${userCode}/messages?isReceived=${isReceived}`;

  
    console.log("api ======== keyword 1" , keyword)
  

    const params = new URLSearchParams(window.location.search);
    console.log("222 : " + page)

    if(params.get("page")){
        requestURL += `&page=${params.get("page")}`;
    }

    // if(params.get("keyword")){
    //     requestURL += `&keyword=${params.get("keyword")}`;
    // }

    if(keyword){
        requestURL += `&keyword=${keyword}`
    }


    console.log("api ======== keyword 1" , keyword)
    
    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    Authorization: `Bearer ${getCookie("accessToken")}`
                },
                
            })
            console.log('[MessageAPICalls] callMessageListAPI RESULT', result);
            if(result.status == 200){
                console.log('[MessageAPICalls] callMessageListAPI SUCCESS');
                dispatch({type: GET_MESSAGES_ISRECEIVED, payload: result, requestURL});
                return result;
            }
        }catch(error){
            console.error('[MessageAPICalls] callMessageListAPI ERROR', error);
            return error;
        }
      
    }
}


export const callMessageDeleteAPI = ({msgCode}) => {
    console.log('[MessageAPICalls] callMessageDeleteAPI CALL');

    const requestURL = `http://localhost:8000/messages/${msgCode}`;

    return async(dispatch, getState) => {
        const result = await axios.delete(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        })

        console.log('[MessageAPICalls] callMessageDeleteAPI RESULT', result);
        
        dispatch({type: DELETE_MESSAGES_MSGCODE, payload: result});
        return result;
    }
}