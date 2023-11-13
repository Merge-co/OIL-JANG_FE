import { useDispatch, useSelector } from 'react-redux';
import { callGetProductCategory } from '../../apis/ProductAPICalls';
import CategoryCSS from '../../styles/ProductCategory.module.css'
import { useEffect, useState } from 'react';

function ProductCategory() {

    const productCategories = useSelector(state => state.productCategoryReducer);

    console.log(productCategories);

    let upperCategory = [];
    for(let category of productCategories) {
        if(category.upperCategoryCode === 0) {
            upperCategory.push([category.categoryName]);
        } else {
            // upperCategory[category.upperCategoryCode-1].push([category.categoryName]);
        }
    }
    console.log(upperCategory);
    console.log(upperCategory[0]);
    


    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetProductCategory());
        },[]
    );
    

    return(
        <>
            <div className={CategoryCSS.cateAll}>
                {upperCategory.map(upperCategory => 
                    <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                        <div className={CategoryCSS.cateUpper}>111</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                        <div className={CategoryCSS.cate3}>111</div>
                    </div>
                </div>
                )}
                
                <button className="smallBtn2 categorySearchBtn">검색</button>
            </div>
        </>
    );
}

export default ProductCategory;