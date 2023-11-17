import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PRODUCT = 'product/GET_PRODUCT';
export const GET_PRODUCTS = 'product/GET_PRODUCTS';
export const GET_PRODUCTS_MEAL = 'product/GET_PRODUCTS_MEAL';
export const GET_PRODUCTS_DESSERT = 'product/GET_PRODUCTS_DESSERT';
export const GET_PRODUCTS_BEVERAGE = 'product/GET_PRODUCTS_BEVERAGE';
export const POST_PRODUCT = 'product/POST_PRODUCT';
export const PUT_PRODUCT = 'product/PUT_PRODUCT';

const actions = createActions(
  {
    [GET_PRODUCT]: () => {},
    [GET_PRODUCTS]: () => {},
    [GET_PRODUCTS_MEAL]: () => {},
    [GET_PRODUCTS_DESSERT]: () => {},
    [GET_PRODUCTS_BEVERAGE]: () => {},
    [POST_PRODUCT]: () => {},
    [PUT_PRODUCT]: () => {},
  },
  { prefix: 'product' } // 액션 타입에 접두사 추가
);

/* 리듀서 */
const productReducer = handleActions(
  {
    [GET_PRODUCT]: (state, { payload }) => payload,
    [GET_PRODUCTS]: (state, { payload }) => payload,
    [GET_PRODUCTS_MEAL]: (state, { payload }) => payload,
    [GET_PRODUCTS_DESSERT]: (state, { payload }) => payload,
    [GET_PRODUCTS_BEVERAGE]: (state, { payload }) => payload,
    [POST_PRODUCT]: (state, { payload }) => payload,
    [PUT_PRODUCT]: (state, { payload }) => payload,
  },
  initialState
);

export default productReducer;
