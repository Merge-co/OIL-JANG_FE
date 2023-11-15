import { useDispatch, useSelector } from 'react-redux';
import { callGetProductCategory } from '../../apis/ProductAPICalls';
import CategoryCSS from '../../styles/product/ProductCategory.module.css'
import { useEffect, useState } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import { GET_MERGE_CATEGORY } from '../../modules/MergeModule';

function ProductCategory(type) {
    const [ categoryLists, setCategoryLists ] = useState([]);

    useEffect(
        () => {
            dispatch(callGetProductCategory());
        },[]
    );

    let changeCategoryLists = [];

    const productCategories = useSelector(state => state.productCategoryReducer);

    let checkFive = categoryLists.filter(category => category.categoryChecked === true);

    let upperCategory = [];
        
    let upperCategoryCount = 0;
    for(let category of productCategories) {
        if(category.upperCategoryCode === 0) {
            upperCategoryCount++;
        }
        changeCategoryLists.push({ id: category.categoryCode, categoryName: category.categoryName, categoryChecked: false });
    }
    
    for(let i = 1; i <= upperCategoryCount; i++) {
        let lowerCategory = [];
        for(let category of productCategories) {
            if(category.upperCategoryCode === i || category.categoryCode === i) {
                lowerCategory.push([category.categoryCode, category.categoryName, category.upperCategoryCode]);
            }
        }
        upperCategory.push(lowerCategory);
    }

    const dispatch = useDispatch();
    
    const categoryBtnHandler = id => {
        if(categoryLists.length === 0) {
            changeCategoryLists.map(categoryList => {
                if(categoryList.id === id) {
                    categoryList.categoryChecked = !categoryList.categoryChecked;
                }
            });
            changeCategoryLists = [...changeCategoryLists];

            let checkFive = changeCategoryLists.filter(category => category.categoryChecked === true);
            setCategoryLists(changeCategoryLists);
        } else {
            
            categoryLists.map(categoryList => {
                if(categoryList.id === id) {
                    categoryList.categoryChecked = !categoryList.categoryChecked;
                }
            });
            changeCategoryLists = [...categoryLists];
            
            let checkFive = categoryLists.filter(category => category.categoryChecked === true);
            if(checkFive.length <= 5 && type.type === "merge") {
                setCategoryLists(changeCategoryLists);
            } else {
                if(type.type === "merge") {
                    alert("최대 5개의 카테고리까지 선택할 수 있습니다.");
                    categoryLists.map(categoryList => {
                        if(categoryList.id === id) {
                            categoryList.categoryChecked = !categoryList.categoryChecked;
                        }
                    });
                } else {
                    categoryLists.map(categoryList => {
                        if(categoryList.id !== id && categoryList.categoryChecked === true) {
                            categoryList.categoryChecked = !categoryList.categoryChecked
                        }
                    });
                    setCategoryLists(changeCategoryLists);
                }
            }
        }
    }

    const onClickHandler = () => {
        if(checkFive.length === 0) {
            alert("최소 1개의 카테고리를 선택해주세요");
        } else {
            dispatch({ type: GET_MERGE_CATEGORY, payload: checkFive});
        }
        
    }

    return(
        <>
            <div className={CategoryCSS.cateAll}>
                {upperCategory.map(upperCategory => 
                    <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                        <div className={CategoryCSS.cateUpper}>{upperCategory[0][1]}</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                        {upperCategory.map(upperCategory => 
                            upperCategory[2] !== 0 ? <div id={upperCategory[0]} className={categoryLists.length !== 0 && categoryLists[upperCategory[0]-1].categoryChecked ? CategoryCSS.cate3Selected : CategoryCSS.cate3} onClick={() => categoryBtnHandler(upperCategory[0])}>{upperCategory[1]}</div> : ""
                        )}
                        
                    </div>
                </div>
                )} 

                <button onClick={() => onClickHandler()} className={`${ButtonCSS.smallBtn2} ${CategoryCSS.categorySearchBtn}`}>검색</button>
            </div>
        </>
    );
}

export default ProductCategory;