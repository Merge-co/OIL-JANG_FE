import axios from "axios";
import{
    POST_INQUIRIES,
    GET_INQUIRIES_INQCODE,
    GET_INQUIRIES_USERCODE,
    GET_INQUIRIES_INQCATECODE,
    GET_INQUIRIES_INQSTATUS,
    PUT_INQUIRIES_INQCODE,
    DELETE_INQUIRIES_INQCODE
} from '../modules/InquiryModule.js';
import { GET_INQUIRIES_CATEGORIES } from "../modules/InquiryCategoryModule.js";
import { getCookie } from "../modules/CookieModule.js";
import { jwtDecode } from "jwt-decode";


export const callGetInquiryCategory = () => {

    console.log('[InquiryAPICalls] callGetInquiryCategory Call');
    let requestURL = `http://localhost:8000/inquiries/categories`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        })

        console.log('[InquiryAPICalls] callGetInquiryCategoryAPI RESULT', result);
        if(result.status == 200){
            console.log('[InquiryAPICalls] callGetInquiryCategoryAPI SUCCESS');
            dispatch({type: GET_INQUIRIES_CATEGORIES, payload: result.data});
            return result;
        }
    }
}


export const callInquiryRegistAPI = ({form}) => {
    console.log('[InquiryAPICalls] callInquiryRegistAPI call');

    let requestURL = `http://localhost:8000/inquiries`;
    let date = new Date();

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {
            inqCode: form.get('inqCode'),
            inqTitle: form.get('inqTitle'),
            inqContent: form.get('inqContent'),
            inqAnswer: form.get('inqAnswer'),
            inqTime: date,
            refUserCode: form.get('refUserCode'),
            inqCategoryInqCategoryDTO: {
                inqCateCode: form.get('inqCateCode'),
                inqCateName: form.get('inqCateName')
            },
            inqStatus: 'N',
            method: "POST",
            headers: {
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            },
            body: form            
        })
        console.log('[InquiryAPICalls] callInquiryRegistAPI RESULT : ' , result);

        dispatch({type: POST_INQUIRIES, payload: result});
        return result;
    }

}


export const callInquiryDetailAPI = ({inqCode}) => {
    console.log('[InquiryAPICalls] callInquiryDetailAPI Call');

    let requestURL = `http://localhost:8000/inquiries/${inqCode}`;

    console.log("inqCode??????????????" + inqCode )
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            }
        })

        console.log('[InquiryAPICalls] callInquiryDetailAPI RESULT', result);
        if(result.status == 200){
            console.log('[InquiryAPICalls] callInquiryDetailAPI SUCCESS');
            dispatch({type: GET_INQUIRIES_INQCODE, payload: result});
            return result;
        }
    }
}


export const callInquiryListAPI = ({userCode, inqCateCode, inqStatus, page, role, keyword}) => {
    console.log('[InquiryAPICalls] callInquiryListAPI Call');

    let requestURL = `http://localhost:8000/users/${userCode}/inquiries`;
    
    const params = new URLSearchParams(window.location.search);

    console.log('22222222222222222222222222', userCode);
    console.log('111111111111111111111111111111', inqStatus);

    console.log("page: " + page)
    if(params.get("page")){
        requestURL += (requestURL.includes('?') ? '&' : '?') + `page=${params.get("page")}`;
    }

    if(inqCateCode){
        if(requestURL.includes('?')){
            requestURL += `&inqCateCode=${inqCateCode}`;
        }else{
            requestURL += `?inqCateCode=${inqCateCode}`;
        }
    }

    if(inqStatus){
        if(requestURL.includes('?')){
            requestURL += `&inqStatus=${inqStatus}`;
        }else{
            requestURL += `?inqStatus=${inqStatus}`;
        }
    }

    if(params.get("keyword")){
          requestURL += (requestURL.includes('?') ? '&' : '?') + `keyword=${params.get("keyword")}`;
    }

    console.log("한성님의 롤" + role)
    if(role){
        if(requestURL.includes('?')){
            requestURL += `&role=${role}`;
        }else{
            requestURL += `?role=${role}`;
        }
    }

    console.log("role1111111111111" + role)
    
    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
             
                
                
            })
            console.log('[InquiryAPICalls] callInquiryListAPI RESULT', result);
            if(result.status == 200){
                console.log('[InquiryAPICalls] callInquiryListAPI SUCCESS');
                dispatch({type: GET_INQUIRIES_USERCODE, payload: result, requestURL});

                console.log("role22222222222222222" + role)
                return result;
            }
        }catch(error){
            console.error('[InquiryAPICalls] callInquiryListAPI ERROR', error);
            return error;
        }
      
    }
}


// export const callInquiryCategoryListAPI = ({userCode, page, role, inqCateCode}) => {
//     console.log('[InquiryAPICalls] callInquiryCategoryListAPI Call');

//     const requestURL = `http://localhost:8000/users/${userCode}/inquiries/categories/${inqCateCode}`;
    
//     const params = new URLSearchParams(window.location.search);

    
//     if(params.get("page")){
//         requestURL += `&page=${params.get("page")}`;
//     }

//     if(params.get("keyword")){
//         requestURL += `&keyword=${params.get("keyword")}`;
//     }
    
//     return async (dispatch, getState) => {
//         try{
//             const result = await axios.get(requestURL, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "*/*",
//                     Authorization: `Bearer ${getCookie("accessToken")}`
//                 },
                
//             })
//             console.log('[InquiryAPICalls] callInquiryCategoryListAPI RESULT', result);
//             if(result.status == 200){
//                 console.log('[InquiryAPICalls] callInquiryCategoryListAPI SUCCESS');
//                 dispatch({type: GET_INQUIRIES_INQCATECODE, payload: result, requestURL});
//                 return result;
//             }
//         }catch(error){
//             console.error('[InquiryAPICalls] callInquiryCategoryListAPI ERROR', error);
//             return error;
//         }
      
//     }
// }




// export const callInquiryStatusListAPI = ({userCode, page, inqStatus}) => {
//     console.log('[InquiryAPICalls] callInquiryStatusListAPI Call');

//     let requestURL = `http://localhost:8000/users/${userCode}/inquiries/status/${inqStatus}`;
    
//     const params = new URLSearchParams(window.location.search);

    
//     if(params.get("page")){
//         requestURL += `&page=${params.get("page")}`;
//     }

//     if(params.get("keyword")){
//         requestURL += `&keyword=${params.get("keyword")}`;
//     }
    
//     return async (dispatch, getState) => {
//         try{
//             const result = await axios.get(requestURL, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "*/*",
//                     Authorization: `Bearer ${getCookie("accessToken")}`
//                 },
                
//             })
//             console.log('[InquiryAPICalls] callInquiryStatusListAPI RESULT', result);
//             if(result.status == 200){
//                 console.log('[InquiryAPICalls] callInquiryStatusListAPI SUCCESS');
//                 dispatch({type: GET_INQUIRIES_INQSTATUS, payload: result, requestURL});
//                 return result;
//             }
//         }catch(error){
//             console.error('[InquiryAPICalls] callInquiryStatusListAPI ERROR', error);
//             return error;
//         }
      
//     }
// }


export const callInquiryModifyAPI = ({form, userCode, inqCode}) => {
    console.log('[InquiryAPICalls] callInquiryModifyAPI Call');

    let requestURL = `http://localhost:8000/users/${userCode}/inquiries/${inqCode}`;

    return async(dispatch, getState) => {

        let date = new Date();

        const result = await axios.put(requestURL, {

            inqCode: form.get('inqCode'),
            inqTitle: form.get('inqTitle'),
            inqContent: form.get('inqContent'),
            inqAnswer: form.get('inqAnswer'),
            inqTime: date,
            refUserCode: form.get('refUserCode'),
            inqCateCode: form.get('inqCateCode'),
            inqCateName: form.get('inqCateName'),
            inqStatus: 'N',
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                Authorization: `Bearer ${getCookie("accessToken")}`
            },
        })

        console.log('[MessageAPICalls] callInquiryModifyAPI RESULT', result);
        
        dispatch({type: PUT_INQUIRIES_INQCODE, payload: result});
        return result;
    }
}



export const callInquiryDeleteAPI = ({userCode, inqCode}) => {
    console.log('[InquiryAPICalls] callInquiryDeleteAPI Call');

    let requestURL = `http://localhost:8000/users/${userCode}/inquiries/${inqCode}`;

    return async(dispatch, getState) => {
            const result = await axios.delete(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    Authorization: `Bearer ${getCookie("accessToken")}`
                }
            })

            console.log('[MessageAPICalls] callInquiryDeleteAPI RESULT', result);
            
            dispatch({type: DELETE_INQUIRIES_INQCODE, payload: result});
            return result;
        }
}