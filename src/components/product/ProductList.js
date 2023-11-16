import ProductItem from "./ProductItem";
import ProductListCSS from '../../styles/product/ProductList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PagingBar from "../common/PagingBar";
import { useEffect } from "react";
import { callGetProductList } from "../../apis/ProductAPICalls";

function ProductList(type) {

    const ProductInfos = useSelector(state => state.productListReducer);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const reset = useSelector(state => state.productReducer);
    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);

    let productList = ProductInfos[0] ? ProductInfos[0].productList : "";
    let pagingBtn = ProductInfos[0] ? ProductInfos[0].pagingBtn : "";

    const dispatch = useDispatch();

    if(window.localStorage.getItem("mergeKeys")) {
        let b = window.localStorage.getItem("mergeKeys").split(",");
        console.log(b);
        console.log(b.map(b => window.localStorage.getItem(b)));
    }

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
        },[PagingInfo, reset, getCategoryCode]
    );

    let styleObject;
    switch(type.type) {
        case "merge":
            styleObject = {width: 840, left: 50};
            break;
        case "list":
            
            break;
        case "main":
            
            break;
        default:
            styleObject = {width: 840, left: 50};
            break;
    }

    return(
        <>
            <div style={styleObject} className={ProductListCSS.productList}>
                {
                    productList ? productList.map(productList => <ProductItem productList={productList} type={type.type}/>) : ""
                }
            </div>
            <PagingBar pagingBtn={pagingBtn}/>
        </>
    );
}

export default ProductList;