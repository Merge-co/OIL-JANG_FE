import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_PRODUCT_SEARCH = 'product/GET_PRODUCT_CATEGORY';

const actions = createActions({
    [GET_PRODUCT_SEARCH]: () => {}
});

const productReducer = handleActions(
    {
        [GET_PRODUCT_SEARCH]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
)

export default productReducer;