import {
    GET_REPORT
} from '../modules/ReportModule'

export const callReportAPI = () => {
    console.log('[ReportAPICalls] callReportAPI Call')
    const requestURL = `http://localhost:8000/reports/reportManagerment`

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
        dispatch({ type: GET_REPORT, payload: result.date });
    };
};