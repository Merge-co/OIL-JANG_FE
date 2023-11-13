import ProductItemCSS from '../../styles/product/ProductItem.module.css';

function ProductItem() {
    return(
        <>
            <div className="productItem">
                <div className={ProductItemCSS.productThumb}></div>
                <div className={ProductItemCSS.productDescBox}>
                    <div className={ProductItemCSS.itemBoxTitle}>좋은 패딩</div>
                    <div className={ProductItemCSS.itemBoxPrice}>63,500원</div>
                    <div className={ProductItemCSS.itemBoxDatetime}>5일전</div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;