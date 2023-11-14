import axios from "axios";
import { GET_CATEGORIES } from "../modules/ProductCategoryModule";
import { GET_PRODUCTLIST } from "../modules/ProductModule";

export const callGetProductCategory = () => {
    const requestURL = `http://localhost:8000/categories`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL).then(
            result => result.data.results.productCategoryList
        );

        dispatch({ type: GET_CATEGORIES, payload: result});
    };
}

export const callGetProductList = (type) => {
    const requestURL = `http://localhost:8000/products?pageKind=${type}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL).then(
            result => result.data.results
        );

        dispatch({ type: GET_PRODUCTLIST, payload: [result]});
    };
}
