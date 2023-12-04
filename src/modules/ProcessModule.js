import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_PROCESSDETAIL = 'report/GET_PROCESSDETAIL';
export const GET_PROCESSING_DETAIL = 'report/GET_PROCESSING_DETAIL';


const actions = createActions({
    [GET_PROCESSDETAIL]: () => { },
    [GET_PROCESSING_DETAIL]: () => { },
});

// reducer
const processReducer = handleActions(
    {
        [GET_PROCESSDETAIL]: (state, { payload }) => {
            return payload;
        },
        [GET_PROCESSING_DETAIL]: (state, { payload }) => ({
            ...state,
            getProcessing: payload
        })
    },
    initialState
);

export default processReducer;
