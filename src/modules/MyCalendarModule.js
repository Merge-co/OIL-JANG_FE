import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_CALENDAR_CONTENT = 'calendar/GET_CALENDAR_CONTENT';
export const GET_CALENDAR_REGIST = 'calendar/GET_CALENDAR_REGIST';
export const GET_CALENDAR_MODIFY = 'calendar/GET_CALENDAR_MODIFY';
export const GET_CALENDAR_DELETE = 'calendar/GET_CALENDAR_DELETE';

const actions = createActions({
    [GET_CALENDAR_CONTENT]: () => {},
    [GET_CALENDAR_REGIST]: () => {},
    [GET_CALENDAR_MODIFY]: () => {},
    [GET_CALENDAR_DELETE]: () => {},
});

const myCalendarReducer = handleActions(
    {
        [GET_CALENDAR_CONTENT]: (state, {payload}) => ({
            ...state,
            getCalendarContent: payload
        }),
        [GET_CALENDAR_REGIST]: (state, {payload}) => ({
            ...state,
            getCalendarRegist: payload
        }),
        [GET_CALENDAR_MODIFY]: (state, {payload}) => ({
            ...state,
            getCalendarModify: payload
        }),
        [GET_CALENDAR_DELETE]: (state, {payload}) => ({
            ...state,
            getCalendarDelete: payload
        }),
    },
    initialState
)

export default myCalendarReducer;