import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductDetail, callWishListRegistAPI } from '../../apis/ProductAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_WISHLIST_AGAIN, priceToString, timeForToday } from '../../modules/ProductModule';
import { getCookie } from '../../modules/CookieModule';
import { callWishListDeleteAPI } from './../../apis/WishListAPICalls';
import { jwtDecode } from 'jwt-decode';
import UserProductDetailImg from './UserProductDetailImg';
import Report from '../report/Report';
import UsedProductDetailInfo from './UsedProductDetailInfo';

function UsedProductDetail() {

    const dispatch = useDispatch();
    const params = useParams();

    const productDetail = useSelector(state => state.productReducer.getProductDetail);
    const productDetailInfos = productDetail && productDetail.productDetail[0];
    const productDetailImg = productDetail && productDetail.selectedProductDetailImg;

    // let wishLishRegist = 0;
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(
        () => {
            dispatch(callGetProductDetail(params.productCode));
        },[]
    );

    // useEffect(
    //     () => {
    //         if(productDetail && productDetail.selectedWishCode) {
    //             wishLishRegist = 1;
    //         } else {
    //             wishLishRegist = 0;
    //         }
    //     },[productDetail]
    // );

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
                                <UsedProductDetailInfo productDetailInfos={productDetailInfos} setModalOpen={setModalOpen} productDetail={productDetail}/>
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
                {modalOpen && getCookie("accessToken") && < Report nickName={productDetailInfos.nickName} productCode={productDetailInfos.productCode} sellStatus={productDetailInfos.sellStatusCode} productName={productDetailInfos.productName} setModalOpen={setModalOpen} />}
            </>
        );
    }

    return (
        <>
            {productDetail && <ProductDetailInfo/>}
        </>
    );
}

export default UsedProductDetail;