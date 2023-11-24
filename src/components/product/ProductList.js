import ProductItem from "./ProductItem";
import ProductListCSS from '../../styles/product/ProductList.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import PagingBarCSS from '../../styles/PagingBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PagingBar from "../common/PagingBar";
import { useEffect } from "react";
import { callGetProductList } from "../../apis/ProductAPICalls";
import { GET_SEARCH_AGAIN } from "../../modules/ProductModule";
import { GET_PAGING } from "../../modules/PagingModule";
import { useState } from "react";

function ProductList(type) {

    const ProductInfos = useSelector(state => state.productListReducer);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const reset = useSelector(state => state.productReducer);
    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);
    const getSearchAgain = useSelector(state => state.productReducer.searchAgain);

    const curURL = new URL(window.location.href);

    let productList = ProductInfos[0] ? ProductInfos[0].productList : "";
    let pagingBtn = ProductInfos[0] ? ProductInfos[0].pagingBtn : "";
    let totalItem = ProductInfos[0] ? ProductInfos[0].totalItem : "";

    const dispatch = useDispatch();

    useEffect(
        () => {
            switch(type.type) {
                case "merge":
                    dispatch(callGetProductList("merge"));
                    break;
                case "list":
                    dispatch(callGetProductList("list"));
                    break;
                case "main":
                    dispatch(callGetProductList("main"));
                    break;
                default:
                    dispatch(callGetProductList("list"));
                    break;
            }
            if(!curURL.searchParams.get('page')) {
                dispatch({ type: GET_PAGING, payload: 0});
            }
            dispatch({ type: GET_SEARCH_AGAIN, payload: 0});
        },[PagingInfo, reset.productFilter, getCategoryCode, getSearchAgain]
    );

    let styleObject;
    switch(type.type) {
        case "merge":
            styleObject = {width: 840, left: 50};
            break;
        case "list":
            styleObject = {width: 1000, left: 50};
            break;
        case "main":
            styleObject = {width: 1210, left: 0};
            break;
        default:
            styleObject = {width: 840, left: 50};
            break;
    }

    function MoreBtn() {
        return(
            <>
                <div className={PagingBarCSS.barCenter}>
                    <button onClick={() => onMoreHandler()} className={ButtonCSS.smallBtn2}>더 보기</button>
                </div>
            </>
        );
    }

    const [ morePage, setMorePage ] = useState(1);

    const onMoreHandler = () => {
        dispatch(callGetProductList("main", (morePage + 1)));
        setMorePage(morePage + 1);
    }

    return(
        <>
            <div style={styleObject} className={ProductListCSS.productList}>
                {
                    productList ? productList.map(productList => <ProductItem productList={productList} type={type.type}/>) : ""
                }
            </div>
            {(totalItem && productList.length === totalItem) ? "" : type.type === "main" ? <MoreBtn/> : productList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
        </>
    );
}

export default ProductList;