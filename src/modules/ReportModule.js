import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = {};

// Actions
export const GET_REPORT = 'report/GET_REPORT';
export const GET_REPORTS = 'report/GET_REPORTS';
export const PUT_REPORT = 'report_PUT_REPORT';
export const POST_REPORT = 'report/PUT_REPORT';
export const GET_PROCESSED = 'report/GET_PROCESSED';
export const POST_PROCESSED_MESSAGES = 'report/POST_PROCESSED_MESSAGES';


const actions = createActions({
    [GET_REPORT]: () => { },
    [GET_REPORTS]: () => { },
    [PUT_REPORT]: () => { },
    [POST_PROCESSED_MESSAGES]: () => { },
    [POST_REPORT]: () => { },
    [GET_PROCESSED]: () => { }
});


// reducer
const reportReducer = handleActions(
    {
        [GET_REPORT]: (state, { payload }) => ({
            ...state,
            getRegistReport: payload
        }),
        [GET_REPORTS]: (state, { payload }) => ({
            ...state,
            getReports: payload
        }),
        [PUT_REPORT]: (state, { payload }) => ({
            ...state,
            updateReport: payload
        }),
        [POST_REPORT]: (state, { payload }) => ({
            ...state,
            insertReport: payload
        }),
        [POST_PROCESSED_MESSAGES]: (state, { payload }) => ({
            ...state,
            getProcessedMessage: payload
        }),
        [GET_PROCESSED]: (state, { payload }) => ({
            ...state,
            getProcessed: payload
        })

    },
    initialState
);

export default reportReducer;
