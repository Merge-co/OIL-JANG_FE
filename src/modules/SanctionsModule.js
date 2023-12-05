import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_SANCTIONSLIST = 'sanctions/GET_SANCTIONSLIST';


const actions = createActions({
    [GET_SANCTIONSLIST]: () => { }
});

// reducer
const sanctionsReducer = handleActions(
    {
        [GET_SANCTIONSLIST]: (state, { payload }) => ({
            ...state,
            getSanctionsList: payload
        }),
    },
    initialState
);

export default sanctionsReducer;
