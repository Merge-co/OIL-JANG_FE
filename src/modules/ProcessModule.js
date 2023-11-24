import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_PROCESSDETAIL = 'report/GET_PROCESSDETAIL';


const actions = createActions({
    [GET_PROCESSDETAIL]: () => { },
});

// reducer
const processReducer = handleActions(
    {
        [GET_PROCESSDETAIL]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default processReducer;
