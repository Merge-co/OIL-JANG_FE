import ProductFilterCSS from '../../styles/product/ProductFilter.module.css';
import ProductCategoryCSS from '../../styles/product/ProductCategory.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_PRODUCT_SEARCH } from '../../modules/ProductModule';
import { useDispatch } from 'react-redux';

function ProductFilter() {

    const [checkedBtn, setCheckedBtn ] = useState(1);
   
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const params = new URLSearchParams(window.location.search);

    const queryString = useLocation().search;


    const onClickHandler = filterNo => {
        setCheckedBtn(filterNo);
        dispatch({ type: GET_PRODUCT_SEARCH, payload: filterNo});
        
        switch(filterNo) {

            case 1:
                if(!params.get("sortCondition")) {
                    if(queryString) {
                        navigate(`${queryString}&sortCondition=latest`);
                    } else {
                        navigate(`?sortCondition=latest`);
                    }
                }
                break;
            case 2:
                if(!params.get("sortCondition")) {
                    if(queryString) {
                        navigate(`${queryString}&sortCondition=maxPrice`);
                    } else {
                        navigate(`?sortCondition=maxPrice`);
                    }
                }
                break;
            case 3:
                if(!params.get("sortCondition")) {
                    if(queryString) {
                        navigate(`${queryString}&sortCondition=minPrice`);
                    } else {
                        navigate(`?sortCondition=minPrice`);
                    }
                }
                break;
            default:
                if(!params.get("sortCondition")) {
                    if(queryString) {
                        navigate(`${queryString}&sortCondition=latest`);
                    } else {
                        navigate(`?sortCondition=latest`);
                    }
                }
                break;
        }
    }
    
    return(
        <>
            <div className={ProductFilterCSS.productFilterContainer}>
                <div className={ProductFilterCSS.productFilter}>
                    <div onClick={() => onClickHandler(1)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 1 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>최신순</div>
                    <div onClick={() => onClickHandler(2)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 2 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>고가순</div>
                    <div onClick={() => onClickHandler(3)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 3 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>저가순</div>
                </div>
            </div>
        </>
    )
}

export default ProductFilter;