import { createActions, handleActions } from "redux-actions";


const initialState = {};

export const GET_PRODUCT_FILTER = 'product/GET_PRODUCT_FILTER';
export const GET_RESET_FILTER = 'product/GET_RESET_FILTER';
export const GET_RESET_PRODUCT_CATEGERY = 'product/GET_RESET_PRODUCT_CATEGERY';
export const GET_RESET_MERGE_CATEGERY_ALL = 'product/GET_RESET_MERGE_CATEGERY';
export const GET_CATEGORY_CODE = 'product/GET_CATEGORY_CODE';
export const GET_MERGE_ITEM = 'product/GET_MERGE_ITEM';
export const GET_SEARCH_AGAIN = 'product/GET_SEARCH_AGAIN';

const actions = createActions({
    [GET_PRODUCT_FILTER]: () => {},
    [GET_RESET_FILTER]: () => {},
    [GET_RESET_PRODUCT_CATEGERY]: () => {},
    [GET_RESET_MERGE_CATEGERY_ALL]: () => {},
    [GET_CATEGORY_CODE]: () => {},
    [GET_MERGE_ITEM]: () => {},
    [GET_SEARCH_AGAIN]: () => {}
});

const productReducer = handleActions(
    {
        [GET_PRODUCT_FILTER]: (state, {payload}) => ({
            ...state,
            productFilter: payload
        }),
        [GET_RESET_FILTER]: (state, {payload}) => ({
            ...state,
            resetFilter: payload
        }),
        [GET_RESET_PRODUCT_CATEGERY]: (state, {payload}) => ({
            ...state,
            resetProductCategory: payload
        }),
        [GET_RESET_MERGE_CATEGERY_ALL]: (state, {payload}) => ({
            ...state,
            resetMergeCategoryAll: payload
        }),
        [GET_CATEGORY_CODE]: (state, {payload}) => ({
            ...state,
            getCategoryCode: payload
        }),
        [GET_MERGE_ITEM]: (state, {payload}) => ({
            ...state,
            getMergeItem: payload
        }),
        [GET_SEARCH_AGAIN]: (state, {payload}) => ({
            ...state,
            searchAgain: payload
        }),
    },
    initialState
)

export default productReducer;