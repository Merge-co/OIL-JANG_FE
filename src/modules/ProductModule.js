import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_PRODUCTLIST = 'product/GET_PRODUCTLIST';

const actions = createActions({
    [GET_PRODUCTLIST]: () => {}
});

const productReducer = handleActions(
    {
        [GET_PRODUCTLIST]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
)

export default productReducer;