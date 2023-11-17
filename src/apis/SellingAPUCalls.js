import { POST_PRODUCT, PUT_PRODUCT } from '../modules/ProductModule.js';
import { GET_PRODUCT, GET_PRODUCTS } from '../modules/SellingProductModule.js';

// export const callSearchProductAPI = ({ form }) => {
//   console.log('[ProduceAPICalls] callSearchProductAPI Call');

//   const requestURL = `http://localhost:8000/products`;

//   return async (dispatch, getState) => {

//     const result = await fetch(requestURL, {
//       method: "post",
//       headers: {
//         "content-Type": "application/json",
//         "Accept": "*/*"
//       }
//     })
//     .then(Response => Response.json());

//     console.log('[ProduceAPICalls] callSearchProductAPI RESULT : ', result);

//     dispatch({ type: GET_PRODUCTS, payload: result.data});
//   };
// };

//insert
export const callProductRegistAPI = ({form}) => {
  console.log('[ProduceAPICalls] callProductRegistAPI Call');

  const requestURL = 'http://localhost:8000/products';

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      },
      body: form
    })
    .then(Response => Response.json());

    console.log('[ProduceAPICalls] callProductRegistAPI RESULT : ', result);

    dispatch({ type: POST_PRODUCT, payload: result});
  };
} //insert END

// export const callProductUpdateAPI