import { createActions, handleActions } from 'redux-actions';

const initialState = {
    accessToken: null,
    user: null,
  };

export const GET_USERS     = 'user/GET_USERS';
export const POST_LOGIN     = 'user/POST_LOGIN';
export const POST_JOIN  = 'user/POST_JOIN';
export const DELETE_USERS = 'user/DELETE_USERS';
export const POST_USERS = 'user/POST_USERS';

const actions = createActions({
    [GET_USERS]: () => {},
    [POST_LOGIN]: () => {},
    [POST_JOIN]: () => {},
    [DELETE_USERS]: () => {},
    [POST_USERS]: () => {}
});

const userReducer = handleActions(
    {
        [GET_USERS]: (state, { payload }) => {
            
            return {
                ...state,
                ...payload
            };
        },
        [POST_LOGIN]: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        },
        [POST_JOIN]: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        },
        [DELETE_USERS]: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        },
        [POST_USERS]: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        },

    },
    initialState
);

export default userReducer;