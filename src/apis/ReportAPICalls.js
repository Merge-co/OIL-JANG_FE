import axios from 'axios';
import {
    GET_REPORTS,
    POST_REPORT,
    POST_PROCESSED_MESSAGES
} from '../modules/ReportModule.js'

import { GET_PROCESSDETAIL, GET_PROCESSING_DETAIL } from '../modules/ProcessModule.js';
import { current } from '@reduxjs/toolkit';

export const callReportManagementAPI = ({ currentPage, search, process }) => {

    console.log('[ReportAPICalls] callReportAPI Call')


    let requestURL = `http://localhost:8000/reports/reports`;

    if (search && search !== 'all') {
        requestURL += `?s=${search}`;
    }
    if (process && process !== 'all') {
        requestURL += `?p=${process}`;
    }
    if (currentPage !== undefined && currentPage !== null) {
        requestURL += `?offset=${currentPage}`;
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
            dispatch({ type: GET_REPORTS, payload: result.data });
            console.log('[ReportAPICalls] callReportDetailAPI SUCCESS');
        } catch (error) {
            console.error('[ReportAPICalls] Error fetching data:', error);
        }
    };
}

export const callReportRegistAPI = ({ form }) => {
    const requestURL = `http://localhost:8000/reports/report`;

    let distinction = "미처리";
    return async (dispatch, getState) => {

        const result = await axios.post(requestURL, {
            reportUserCode: form.get('reportUserCode'),
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

export const callProcessingDetailAPI = ( reportNo, userCode ) => {

    console.log('[ReportAPICalls] callProcessingDetailAPI')

    const requestURL = `http://localhost:8000/reports/processingDetail/${reportNo}?user=${userCode}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
            .then(response => response.json());
        console.log('[ReportAPICalls] callProcessingDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[ReportAPICalls] callReportDetailAPI SUCCESS');
            dispatch({ type: GET_PROCESSING_DETAIL, payload: result });
        }
    }



}
export const callProcessedMessageAPI = ({ message, refUserCode, productCode }) => {

    console.log('[ReportAPICalls] callProcessMessageAPI')

    let requestURL = `http://localhost:8000/messages`;
    let date = new Date().toISOString().substring(0, 10);

    return async (dispatch, getState) => {

        const result = await axios.post(requestURL, {

            headers: {
                "Accept": "*/*",
            },
            "msgCode": 0,
            "msgContent": message,
            "msgDeleteInfoMsgDeleteDTO": {
                "msgDeleteCode": 1,
                "msgDeleteStatus": "N"
            },
            "msgStatus": "N",
            "msgTime": date,
            "receiverCode": refUserCode,
            "refProductCode": productCode,
            "senderCode": 4

        }).then(response => response);
        dispatch({ type: POST_PROCESSED_MESSAGES, payload: result });
        console.log('[ReportAPICalls] callProcessedMessageAPI SUCCESS');
    };
}

export const callCompanionMessageAPI = ({ message, reportUserCode, productCode }) => {

    console.log('[ReportAPICalls] callProcessMessageAPI')

    console.log('반려 API :', reportUserCode);
    let requestURL = `http://localhost:8000/messages`;
    let date = new Date().toISOString().substring(0, 10);

    return async (dispatch, getState) => {

        const result = await axios.post(requestURL, {

            headers: {
                "Accept": "*/*",
            },
            "msgCode": 0,
            "msgContent": message,
            "msgDeleteInfoMsgDeleteDTO": {
                "msgDeleteCode": 1,
                "msgDeleteStatus": "N"
            },
            "msgStatus": "N",
            "msgTime": date,
            "receiverCode": reportUserCode,
            "refProductCode": productCode,
            "senderCode": 4

        }).then(response => response);
        dispatch({ type: POST_PROCESSED_MESSAGES, payload: result });
        console.log('[ReportAPICalls] callProcessedMessageAPI SUCCESS');
    };
}
