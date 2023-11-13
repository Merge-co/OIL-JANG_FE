import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [];

// Actions

export const GET_REPORT = 'report/GET_REPORT';

const actions = createActions({
    [GET_REPORT]: () => { }
});

// reducer
const reportReducer = handleActions(
    {
        [GET_REPORT]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default reportReducer;
