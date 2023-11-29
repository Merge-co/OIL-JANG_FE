export const callProductEditAPI = (productCode, updatedFields) => {
    console.log('[ProductEditAPICalls] Product Update API Call');
  
    const requestURL = `http://localhost:8000/products/${productCode}`;
  
    const productDTO = {
      productName: updatedFields.productName,
      // productThumbAddr: updatedFields.productThumbAddr,
      refCategoryCode: updatedFields.refCategoryCode,
      productPrice: updatedFields.productPrice,
      productDesc: updatedFields.productDesc,
      wishPlaceTrade: updatedFields.wishPlaceTrade,
    };
    
    console.log("ㄱㅇㄱㅇㄱㅇ",productDTO);
    
    const response = fetch(requestURL, {
      method: 'PUT', // PUT 메서드 사용
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(productDTO),
    });

    return async (dispatch, getState) => {

  
        const result = await response.json();
        console.log('[ProductEditAPICalls] callProductEditAPI RESULT:', result);
    };
  };
  