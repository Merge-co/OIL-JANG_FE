import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductDetail } from '../../apis/ProductAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import UserProductDetailImg from './UserProductDetailImg';
import UsedProductDetailInfo from './UsedProductDetailInfo';

function UsedProductDetail() {

    const dispatch = useDispatch();
    const params = useParams();

    const productDetail = useSelector(state => state.productReducer.getProductDetail);
    const productDetailInfos = productDetail && productDetail.productDetail[0];
    const productDetailImg = productDetail && productDetail.selectedProductDetailImg;

    const paramCheck = productDetailInfos && productDetailInfos.productCode == params.productCode;

    useEffect(
        () => {
            dispatch(callGetProductDetail(params.productCode));
        },[]
    );


    const navigate = useNavigate();

    const onClickHome = () => {
        navigate(`/`);
    }

    function ProductDetailInfo() {
        return (
            <>
                <div className={ProductDetailCSS.productDetailContainer}>
                    <div className={ProductDetailCSS.productDetailBox}>
                        <div className={ProductDetailCSS.productDetailBox}>
                            <div className={ProductDetailCSS.productDirBox}>
                            <img onClick={() => onClickHome()} className={`${ProductDetailCSS.homeBtnCursor} ${ProductDetailCSS.productDirBtn}`}
                            src="/images/siteImage/home.svg" height="24" alt=""/>
                                <div className={ProductDetailCSS.productDir1}>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;홈&nbsp;</div>
                                <img className={ProductDetailCSS.productDir1} src="/images/siteImage/categoryArrow.svg" height="15" alt=""/>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.upperCategoryName}&nbsp;</div>
                                <img className={ProductDetailCSS.productDir1} src="/images/siteImage/categoryArrow.svg" height="15" alt=""/>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.categoryName}&nbsp;</div>
                                </div>
                            </div>
                            <div className={ProductDetailCSS.productDetailBoth}>
                                <UserProductDetailImg productDetailImg={productDetailImg}/>
                                <UsedProductDetailInfo productDetailInfos={productDetailInfos} productDetail={productDetail}/>
                            </div>
                            <div className={ProductDetailCSS.productInfoAndPlace}>
                                <div className={ProductDetailCSS.productDetailInfoTitle}>상품 정보</div>
                                <div className={ProductDetailCSS.productDetailInfoContent}>{productDetailInfos.productDesc}</div>
                                <div className={ProductDetailCSS.wishPlaceToTraceTitle}>거래희망장소</div>
                                <div className={ProductDetailCSS.wishPlaceToTraceContent}>{productDetailInfos.wishPlaceTrade}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        );
    }

    return (
        <>
            {productDetail && paramCheck && <ProductDetailInfo/>}
        </>
    );
}

export default UsedProductDetail;