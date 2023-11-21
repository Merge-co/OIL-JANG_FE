import axios from 'axios';
import {
    GET_REPORTS,
    GET_PROCESSDETAIL,
    POST_REPORT,
    PUT_REPORT
} from '../modules/ReportModule.js'

export const callReportManagementAPI = () => {

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
        dispatch({ type: GET_REPORTS, payload: result });
    };
}

export const callReportRegistAPI = ({ form }) => {
    const requestURL = `http://localhost:8000/reports/report`;

    console.log('[ReportRegist] fromData productCode : ', form.get('productCode'));

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {

            reportUserNick: form.get('reportUserNick'),
            refReportCategoryNo: form.get('refReportCategoryNo'),
            productCode: form.get('productCode'),
            reportComment: form.get('reportComment'),
            sellStatusCode: form.get('sellStatusCode'),
            processDistinction: form.get('processDistinction')
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
        let processCode = "Y";

        const result = await axios.put(requestURL, {
            reportNo : form.get('reportNo'),
            processDistinction: processCode,
            processComment: form.get('processComment'),
            sellStatusCode: form.get('sellStatusCode'),
            processDate: date
        })
            .then(response => response);
        console.log('[ReportAPICalls] callProductUpdateAPI RESULT : ', result)
        dispatch({ type: PUT_REPORT, payload: result });
    };
}

export const callReportDetailAPI = ({ reportNo }) => {

    console.log("[ReportAPICalls] ReportDetailAPI :", reportNo);

    const requestURL = `http://localhost:8000/reports/processDetail/${reportNo}`;

    console.log('[ReportAPICall] callReportDetailAPI : ')

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

export const callSearchReportAPI = ({ search }) => {
    console.log('[ReportAPICalls] callSearchReportAPI Call');

    console.log("받아옴 ? :", search);

    const requestURL = `http://localhost:3000/search?value=${search}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
            .then(response => response.json());
        console.log('[ReportAPICalls] callSearchReportAPI RESULT : ', result);

        dispatch({ type: GET_REPORTS, payload: result });
    }

}