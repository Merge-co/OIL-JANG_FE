import { createActions, handleActions } from "redux-actions";
// 초기값
const initialState = [];

// Actions
export const GET_REPORTS = 'report/GET_REPORTS';

const actions = createActions({
    [GET_REPORTS]: () => {}
});

// reducer
const reportReducer = handleActions(
    {
        [GET_REPORTS]: (state, { payload }) => {
            // console.log('(reducer) payload : ', payload);
            return payload;
        }
    },
    initialState
);
console.log('Module', reportReducer);

export default reportReducer;
