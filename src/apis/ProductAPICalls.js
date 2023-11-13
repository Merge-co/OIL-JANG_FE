import axios from "axios";
import { GET_CATEGORIES } from "../modules/ProductCategoryModule";

export const callGetProductCategory = () => {
    const requestURL = "http://localhost:8000/categories";

    return async function getCategory(dispatch, getState) {
        const result = await axios.get(requestURL).then(
            result => result.data.results.productCategoryList
        );

        dispatch({ type: GET_CATEGORIES, payload: result});
    }

    
    
}
