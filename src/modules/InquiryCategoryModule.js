import {createActions, handleActions} from "redux-actions";


const initialState = [];

export const GET_INQUIRIES_CATEGORIES = 'inquiry/GET_INQUIRIES_CATEGORIES';

const actions = createActions({
    [GET_INQUIRIES_CATEGORIES]: () => {},
});

const inquiryCategoryReducer = handleActions(
    {
        [GET_INQUIRIES_CATEGORIES]:(state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default inquiryCategoryReducer;