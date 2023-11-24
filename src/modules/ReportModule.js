import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = {};

// Actions
export const GET_REPORT = 'report/GET_REPORT';
export const GET_REPORTS = 'report/GET_REPORTS';
export const PUT_REPORT = 'report_PUT_REPORT';
export const POST_REPORT = 'report/PUT_REPORT';
export const GET_SEARCH_REPORTS = 'report/GET_SEARCH_REPORTS';


const actions = createActions({
    [GET_REPORT]: () => { },
    [GET_REPORTS]: () => { },
    [PUT_REPORT]: () => { },
    [GET_SEARCH_REPORTS]: () => { },
    [POST_REPORT]: () => { }
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
        [GET_SEARCH_REPORTS]: (state, { payload }) => ({
            ...state,
            searchReport: payload
        })
    },
    initialState
);

export default reportReducer;
