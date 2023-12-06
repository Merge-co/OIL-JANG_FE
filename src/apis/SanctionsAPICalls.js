import axios, { Axios } from "axios";
import { 
    GET_SANCTIONSLIST,
    POST_SANCTIONS,
    PUT_SANCTUONS

} from "../modules/SanctionsModule";

export const callSanctionsListAPI = ({ currentPage }) => {

    console.log('[SanctionsAPICalls] callSanctionsListAPI Call')

    let requestURL = `http://localhost:8000/sanctions/sanction`;

    if (currentPage !== undefined && currentPage !== null) {
        requestURL += `?currentPage=${currentPage}`; // offset 대신 currentPage 사용
    }

    // if (currentPage !== undefined && currentPage !== null) {
    //     requestURL += `?offset=${currentPage}`;
    // }

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
            console.log('[SanctionsAPICalls] callSanctionsListAPI RESULT : ', result);
            dispatch({ type: GET_SANCTIONSLIST, payload: result.data.data });
            console.log('[SanctionsAPICalls] callSanctionsListAPI  SUCCESS');
        } catch (error) {
            console.error('[SanctionsAPICalls] Error fetching data:', error);
        }
    };
}

export const callSanctionsRegistAPI = (refUserCode) => {
    console.log('[SanctionsAPICalls] callSanctionsRegistAPI Call');

    const requestURL = `http://localhost:8000/sanctions/sanction`

    console.log('API ', refUserCode);

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, {
            refUserCode
        })
            .then(response => response);
        console.log('[SanctionsAPICalls] callSanctionsWriteAPI RESULT : ', result);
        dispatch({ type: POST_SANCTIONS, payload: result });
    }
}

export const callSanctionsUpdateAPI = ({ form }) => {
    console.log('[SanctionsAPICalls] callSanctionsUpdateAPI Call');

    console.log('refUserCode', form.get('refUserCode'))
    console.log('sanctions', form.get('sanctionsDate'))
    console.log('managerDate', form.get('managerDate'));

    const requestURL = `http://localhost:8000/sanctions/sanction`

    return async (dispatch, getStatus) => {

        const result = await axios.put(requestURL, {
            refUserCode: form.get('refUserCode'),
            sanctionsDate : form.get('sanctionsDate'),
            managerDate: form.get('managerDate')
        })
            .then(response => response);
            console.log('[SanctionsAPICalls] callSanctionsUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_SANCTUONS, payload: result });
            console.log('[SanctionsAPICalls] callSanctionsUpdateAPI SUCCESS');
    };
}