import { GET_WISHLIST_DELELE_RESULT } from "../modules/ProductModule";

export const callWishListDeleteAPI = productCode => {
    let requestURL = `http://localhost:8000/wishLists/${wishList}`;
    console.log(requestURL);
    
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {
            headers: {
                "Accept": "*/*"
            }
        }).then(
            result => result.data.results.productCategoryList
        );
        dispatch({ type: GET_WISHLIST_DELELE_RESULT, payload: 1});
    };
}