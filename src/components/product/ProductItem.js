import ProductItemCSS from '../../styles/product/ProductItem.module.css';
import ProductListCSS from '../../styles/product/ProductList.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useDispatch } from 'react-redux';
import { GET_MERGE_ITEM, onClickItemDetail, priceToString, timeForToday } from '../../modules/ProductModule';
import { useNavigate } from 'react-router-dom';

function ProductItem(productList) {
    const productElement = productList.productList;
    const type = productList.type;

    const dispatch = useDispatch();

    const onClickHandler = () => {
        const productSerial = "product" + productElement.productCode;
        window.localStorage.setItem(productSerial, JSON.stringify(productElement));
        if(!window.localStorage.getItem("mergeKeys")) {
            window.localStorage.setItem("mergeKeys", productSerial);
        } else {
            let mergeKeys = window.localStorage.getItem("mergeKeys").split(",");
            mergeKeys.push(productSerial);
            mergeKeys = Array.from(new Set(mergeKeys));
            window.localStorage.setItem("mergeKeys", mergeKeys);
        }
        dispatch({ type: GET_MERGE_ITEM, payload: 1 });
    }

    const navigate = useNavigate();
    return(
        <>  
            <div className='mergeItem'>
                <div className={ProductListCSS.productItem}>
                    <div onClick={() => type === "merge" ? onClickItemDetail(productElement.productCode) : navigate(`/usedProduct/${productElement.productCode}`)} className={ProductItemCSS.productThumb}>
                        <img src={productElement.productThumbAddr} alt='상품 이미지' height="166" />
                    </div>
                    <div onClick={() => type === "merge" ? onClickItemDetail(productElement.productCode) : navigate(`/usedProduct/${productElement.productCode}`)} className={ProductItemCSS.productDescBox}>
                        <div className={ProductItemCSS.itemBoxTitle} title={productElement.productName}>{productElement.productName}</div>
                        <div className={ProductItemCSS.itemBoxPrice}>{priceToString(productElement.productPrice)}</div>
                        <div className={ProductItemCSS.itemBoxDatetime}>{timeForToday(productElement.enrollDateTime)}</div>
                    </div>
                    {type === 'merge' ? <button onClick={() => onClickHandler()} className={`${ButtonCSS.smallBtn2} ${ProductListCSS.addItem}`}>담기</button>: ""}
                </div>
            </div>
            
        </>
    );
}

export default ProductItem;