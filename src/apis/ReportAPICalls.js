import axios from 'axios';
import {
    GET_REPORTS,
    POST_REPORT,
} from '../modules/ReportModule.js'

import { GET_PROCESSDETAIL } from '../modules/ProcessModule.js';

export const callReportManagementAPI = ({ currentPage, search, process }) => {

    console.log('[ReportAPICalls] callReportAPI Call')
    console.log('1############### 찍힘 ?')
    console.log('currentPage', currentPage);
    console.log('search', search);
    console.log('process', process);

    let requestURL = `http://localhost:8000/reports/reports?offset=${currentPage}`;

    console.log('2############### 찍힘 ?', requestURL);

    if (search) {
        // 검색 할 경우
        requestURL += `&s=${search}`;
        if (process) {
            // 처리 미처리 상태
            requestURL += `&p=${process}`;
        } else {
            //전체조회
            requestURL += `&p=all&s=all`;
            if (currentPage !== undefined || currentPage !== null) {
                //페이징 처리
                requestURL += `?offset=${currentPage}`;
            }
        }
    }

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            if (!response.ok) {
                throw new Error('문제가 발생해쒀어ㅓㅓㅓ!!!!!')
            }

            const result = await response.json();
            console.log('[ReportAPICalls] callReportList Result : ', result);
            dispatch({type: GET_REPORTS , payload : result.data});
        } catch (error) {
            console.error('[ReportAPICalls] Error fetching data:', error);
        }
    };
}

export const callReportRegistAPI = ({ form }) => {
    const requestURL = `http://localhost:8000/reports/report`;

    console.log('[ReportRegist] fromData 유저닉네임 : ', form.get('reportUserNick'));
    let distinction = "미처리";
    return async (dispatch, getState) => {

        const result = await axios.post(requestURL, {

            reportUserNick: form.get('reportUserNick'),
            refReportCategoryNo: form.get('refReportCategoryNo'),
            productCode: form.get('productCode'),
            reportComment: form.get('reportComment'),
            sellStatusCode: form.get('sellStatusCode'),
            processDistinction: distinction
        }

        ).then(response => response);
        console.log('[ReportAPICalls] callReportWriteAPI RESULT : ', result);
        dispatch({ type: POST_REPORT, payload: result });
    };
}

export const callReportUpdateAPI = ({ form }) => {
    console.log('[ReportAPICalls] callProductUpdateAPI Call');

    const requestURL = `http://localhost:8000/reports/process`

    return async (dispatch, getStatus) => {

        let date = new Date();
        let processCode = "처리";

        const result = await axios.put(requestURL, {
            reportNo: form.get('reportNo'),
            processDistinction: processCode,
            processComment: form.get('processComment'),
            sellStatusCode: form.get('sellStatusCode'),
            processDate: date
        })
            .then(response => response);
        console.log('[ReportAPICalls] callProductUpdateAPI RESULT : ', result)
        // dispatch({ type: PUT_REPORT, payload: result });
    };
}

export const callReportDetailAPI = ({ reportNo }) => {

    const requestURL = `http://localhost:8000/reports/processDetail/${reportNo}`;

    console.log('[ReportAPICall] callReportDetailAPI : ', reportNo)

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
            .then(response => response.json());

        console.log('[ReportAPICalls] callReportDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[ReportAPICalls] callReportDetailAPI SUCCESS');
            dispatch({ type: GET_PROCESSDETAIL, payload: result });
        }
    }
}

// export const callSearchReportAPI = ({ search, process }) => {
//     console.log('[ReportAPICalls] callSearchReportAPI Call');

//     let requestURL = `http://localhost:8000/reports/search?s=${search}`;

//     if (process) {
//         requestURL += `&p=${process}`;
//     }

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//             .then(response => response.json());
//         console.log('[ReportAPICalls] callSearchReportAPI RESULT : ', result);

//         dispatch({ type: GET_REPORTS, payload: result });
//     }
// }
