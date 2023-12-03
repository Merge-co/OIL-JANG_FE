import ProductItem from "./ProductItem";
import ProductListCSS from '../../styles/product/ProductList.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import PagingBarCSS from '../../styles/PagingBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PagingBar from "../common/PagingBar";
import { useEffect, useRef } from "react";
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

    const rendered = useRef();
    const requestUrl = ProductInfos && ProductInfos.length !== 0 && ProductInfos[1];

    useEffect(
        () => {
            
            window.history.scrollRestoration = "auto";
            if(!curURL.searchParams.get('page') && PagingInfo != 0) {
                dispatch({ type: GET_PAGING, payload: 0 });
            }

            if (rendered.current !== window.location.href || getSearchAgain) {
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
            }

            rendered.current = window.location.href;

            dispatch({ type: GET_SEARCH_AGAIN, payload: 0 });
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

    function NoResult() {
        
        return(
            <>
                <div className={ProductListCSS.noResult}>
                    검색 결과가 없습니다
                </div>
            </>
        );
    }

    function ProductListResult() {
        return (
            <>
                <div style={styleObject} className={ProductListCSS.productList}>
                    {
                        productList ? productList.map(productList => <ProductItem key={"productList" + productList.productCode} productList={productList} type={type.type}/>) : ""
                    }
                </div>
                {productList == "" ? <NoResult/> : ""}
                {(totalItem && productList.length === totalItem) ? "" : type.type === "main" ? <MoreBtn/> : productList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
            </>
        );
    }

    // let paramCheckAll;
    // const url = new URL(window.location.href);
    // const requestUrl = ProductInfos && ProductInfos.length !== 0 && new URL(ProductInfos[1]);
    // if (requestUrl) {
    //     let paramCheck1 = url.searchParams.get("categoryCode") === requestUrl.searchParams.get("categoryCode");
    //     let paramCheck2 = url.searchParams.get("page") === requestUrl.searchParams.get("page");
    //     if (type.type == "main") {
    //         paramCheck2 = true;
    //     }
    //     console.log(paramCheck2);
    //     console.log(window.localStorage.getItem("remainMoneySearch"));
    //     console.log(requestUrl.searchParams.get("maxPrice"));
    //     let paramCheck3 = parseInt(+window.localStorage.getItem("remainMoney") * 1.1) == requestUrl.searchParams.get("maxPrice");
    //     if (type.type != "merge") {
    //         paramCheck3 = true;
    //     }
    //     console.log(paramCheck3);
    //     paramCheckAll = paramCheck1;
    // }

    return(
        <>
            {/* {(paramCheckAll || type.type != "merge") && <ProductListResult/>} */}
            {(requestUrl === rendered.current || PagingInfo) != 0 && <ProductListResult />}
        </>
    );
}

export default ProductList;