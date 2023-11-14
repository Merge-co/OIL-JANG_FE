import ProductItem from "./ProductItem";
import ProductListCSS from '../../styles/product/ProductList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductList } from '../../apis/ProductAPICalls';
import { useEffect, useState } from 'react';
import PagingBar from "../common/PagingBar";



function ProductList(type) {
    
    const dispatch = useDispatch();

    const ProductInfos = useSelector(state => state.productReducer);

    let productList = ProductInfos[0] ? ProductInfos[0].productList : "";
    let pagingBtn = ProductInfos[0] ? ProductInfos[0].pagingBtn : "";

    useEffect(
        () => {
            switch(type) {
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
        },[]
    );

    return(
        <>
            <div className={ProductListCSS.productList}>
                {
                    productList ? productList.map(productList => <ProductItem productList={productList} type={"merge"}/>) : ""
                }
            </div>
            <PagingBar pagingBtn={pagingBtn}/>
        </>
    );
}

export default ProductList;