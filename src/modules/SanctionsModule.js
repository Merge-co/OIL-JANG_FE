import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_SANCTIONSLIST = 'sanctions/GET_SANCTIONSLIST';
export const POST_SANCTIONS = 'sanctions/POST_SANCTIONS';
export const PUT_SANCTUONS = 'sanctions/PUT_SANCTUONS';

const actions = createActions({
    [GET_SANCTIONSLIST]: () => { },
    [POST_SANCTIONS]: () => { },
    [PUT_SANCTUONS]: () => { }
});

// reducer
const sanctionsReducer = handleActions(
    {
        [GET_SANCTIONSLIST]: (state, { payload }) => ({
            ...state,
            getSanctionsList: payload
        }),
        [POST_SANCTIONS]: (state, { payload }) => ({
            ...state,
            registSanctions: payload
        }),
        [PUT_SANCTUONS]: (state, {payload}) => ({
            ...state,
            updateSanctions:payload
        })
    },
    initialState
);

export default sanctionsReducer;
