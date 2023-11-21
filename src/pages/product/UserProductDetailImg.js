import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';

const onErrorImg = (e) => {
    e.target.src = "/images/home.svg";
}

function UserProductDetailImg(productDetailImg) {
    return(
        <>
            <img src={productDetailImg && productDetailImg} alt="상품 이미지" className={ProductDetailCSS.productDetailLeftImage} onError={onErrorImg}/>
        </>
    );
}

export default UserProductDetailImg;
