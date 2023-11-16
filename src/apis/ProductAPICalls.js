import axios from "axios";
import { GET_CATEGORIES } from "../modules/ProductCategoryModule";
import { GET_PRODUCTLIST } from "../modules/ProductListModule";

export const callGetProductCategory = () => {
    const requestURL = `http://localhost:8000/categories`;

    const token = `Bearer ${window.localStorage.getItem("userToken")}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                Authorization: token,
            }
        }).then(
            result => result.data.results.productCategoryList
        );

        dispatch({ type: GET_CATEGORIES, payload: result});
    };
}

export const callGetProductList = (type) => {
    let requestURL = `http://localhost:8000/products?pageKind=${type}`;

    const params = new URLSearchParams(window.location.search);
    if(params.get("page")) {
        requestURL += `&page=${params.get("page")}`;
    }
    if(params.get("categoryCode")) {
        requestURL += `&categoryCode=${params.get("categoryCode")}`;
    }
    if(params.get("sortCondition")) {
        requestURL += `&sortCondition=${params.get("sortCondition")}`;
    }
    if(params.get("minPrice")) {
        requestURL += `&minPrice=${params.get("minPrice")}`;
    }
    if(params.get("maxPrice")) {
        requestURL += `&maxPrice=${params.get("maxPrice")}`;
    }
    
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL).then(
            result => result.data.results
        );

        dispatch({ type: GET_PRODUCTLIST, payload: [result]});
    };
}
