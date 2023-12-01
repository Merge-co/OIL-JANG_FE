import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_INQUIRIES = 'inquiry/POST_INQUIRIES';
export const GET_INQUIRIES_INQCODE = 'inquiry/GET_INQUIRIES_INQCODE';
export const GET_INQUIRIES_USERCODE = 'inquiry/GET_INQUIRIES_USERCODE';
export const GET_INQUIRIES_INQCATECODE = 'inquiry/GET_INQUIRIES_INQCATECODE';
export const GET_INQUIRIES_INQSTATUS = 'inquiry/GET_INQUIRIES_INQSTATUS';
export const PUT_INQUIRIES_INQCODE = 'inquiry/PUT_INQUIRIES_INQCODE';
export const DELETE_INQUIRIES_INQCODE = 'inquiry/DELETE_INQUIRIES_INQCODE';


const actions = createActions({
    [POST_INQUIRIES]: () => {},
    [GET_INQUIRIES_INQCODE]: () => {},
    [GET_INQUIRIES_USERCODE]: () => {},
    [GET_INQUIRIES_INQCATECODE]: () => {},
    [GET_INQUIRIES_INQSTATUS]: () => {},
    [PUT_INQUIRIES_INQCODE]: () => {},
    [DELETE_INQUIRIES_INQCODE]: () => {}
});


const inquiryReducer = handleActions({
    [POST_INQUIRIES]: (state, {payload}) => {
        return payload;
    },
    [GET_INQUIRIES_INQCODE]: (state, {payload}) => {
        return payload;
    },
    [GET_INQUIRIES_USERCODE]: (state, {payload}) => {
        return payload;
    },
    [GET_INQUIRIES_INQCATECODE]: (state, {payload}) => {
        return payload;
    },
    [GET_INQUIRIES_INQSTATUS]: (state, {payload}) => {
        return payload;
    },
    [PUT_INQUIRIES_INQCODE]: (state, {payload}) => {
        return payload;
    },
    [DELETE_INQUIRIES_INQCODE]: (state, {payload}) => {
        return payload;
    }
},
initialState
);

export default inquiryReducer;