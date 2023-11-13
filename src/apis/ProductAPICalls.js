import axios from "axios";

export const callGetProductCategory = () => {
    const requestURL = "http://localhost:8000/categories";

    return async function getCategory(dispatch, getState) {
        const result = await axios.get(requestURL).then(
            result => result.data.results.productCategoryList
        );
        
        console.log(result);

        dispatch({ type: GET_CATEGORIES, payload: result});
    }

    
    
}
