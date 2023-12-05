import { GET_SANCTIONSLIST } from "../modules/SanctionsModule";

export const callSanctionsListAPI = ({ currentPage }) => {

    console.log('[SanctionsAPICalls] callSanctionsListAPI Call')

    let requestURL = `http://localhost:8000/sanctions/sanction`;

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
            console.log('[SanctionsAPICalls] callSanctionsListAPI RESULT : ', result);
            dispatch({ type: GET_SANCTIONSLIST, payload: result.data.data });
            console.log('[SanctionsAPICalls] callSanctionsListAPI  SUCCESS');
        } catch (error) {
            console.error('[SanctionsAPICalls] Error fetching data:', error);
        }
    };
}