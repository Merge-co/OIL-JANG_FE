import axios from 'axios';
import {
    GET_REPORTS,
    POST_REPORT
} from '../modules/ReportModule.js'

export const callReportAPI = () => {

    console.log('[ReportAPICalls] callReportAPI Call')

    const requestURL = `http://localhost:8000/reports/reportSelect`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
            .then(response => response.json());
        console.log('[ReportAPICalls] callReportList Result : ', result);
        dispatch({ type: GET_REPORTS, payload: result});
    };
}

// export const callReportRegistAPI = ({ form }) => {
//     console.log('[ReportAPICalls] callReportRegistAPI Call');

//     const requestURL = `http://localhost:8000/reports/report`;

//     console.log("데이터 담겨있니 ?", form.get('sellStatusCode'));
//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {

//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 // 로그인 토큰 정보 
//             },
//             body: 
//                 {
//                     "reportUserNick": form.reportUserNick,
//                     "refReportCategoryNo": form.refReportCategoryNo,
//                     "productCode": form.productCode,
//                     "reportComment": form.reportComment,
//                     "sellStatusCode": form.sellStatusCode
//                 }
//             // body: form
//         })
//             .then(response => response.json());
//         console.log('[ReportAPICalls] callReportWriteAPI RESULT : ', result);

//         dispatch({ type: POST_REPORT, payload: result });
//     }
// }

export const callReportRegistAPI = ({form}) => {
    const requestURL = `http://localhost:8000/reports/report`;

    console.log('[ReportRegist] fromData productCode : ', form.get('productCode'));

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {

            reportUserNick: form.get('reportUserNick'),
            refReportCategoryNo: form.get('refReportCategoryNo'),
            productCode: form.get('productCode'),
            reportComment: form.get('reportComment'),
            sellStatusCode: form.get('sellStatusCode')
        }

        ).then(response => response);
                console.log('[ReportAPICalls] callReportWriteAPI RESULT : ', result);
                dispatch({ type: POST_REPORT, payload: result });
    };
}