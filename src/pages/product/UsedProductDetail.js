import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductDetail, callWishListRegistAPI } from '../../apis/ProductAPICalls';
import { useParams } from 'react-router-dom';
import { priceToString, timeForToday } from '../../modules/ProductModule';
import { getCookie } from '../../modules/CookieModule';

function UsedProductDetail() {

    const dispatch = useDispatch();
    const params = useParams();

    const productDetail = useSelector(state => state.productReducer.getProductDetail);
    const productDetailInfos = productDetail && productDetail.productDetail[0];
    const productDetailImg = productDetail && productDetail.selectedProductDetailImg;

    useEffect(
        () => {
            dispatch(callGetProductDetail(params.productCode));

        },[]
    );

    const [wishLishRegist, setWishLishRegist] = useState(0);

    const onClickPickHandler = () => {
       
        if (getCookie("accessToken")) {
            if (wishLishRegist === 0) {
                dispatch(callWishListRegistAPI(params.productCode));
            } else {
                
            }
            
        } else {
            alert("쪽지를 보내려면 로그인 해야 합니다.");
        }
    }

    function ProductDetailInfo() {
        return (
            <>
                <div className={ProductDetailCSS.productDetailBox}>
                    <div className={ProductDetailCSS.productDetailBox}>
                        <div className={ProductDetailCSS.productDirBox}>
                        <img className={ProductDetailCSS.productDirBtn} src="/images/home.svg" height="24" alt=""/><div className={ProductDetailCSS.productDir1}>
                        <div className={ProductDetailCSS.productDirBtn}>&nbsp;홈&nbsp;</div>
                        <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.upperCategoryName}&nbsp;</div>
                        <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                        <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.categoryName}&nbsp;</div>
                        </div>
                    </div>
                        <div className={ProductDetailCSS.productDetailBoth}>
                        <div className={ProductDetailCSS.productDetailLeftImage}></div>
                        <div className={ProductDetailCSS.productDetailRight}>
                            <div className={ProductDetailCSS.productDetailName}>{productDetailInfos.productName}</div>
                            <div className={ProductDetailCSS.productDetailPriceBox}>
                            <div className={ProductDetailCSS.productDetailPrice}>{priceToString(productDetailInfos.productPrice).replace("원","")}</div><div className={ProductDetailCSS.productDetailWon}>원</div>
                            </div>
                            <div className={ProductDetailCSS.detailHr}></div>
                            <div className={ProductDetailCSS.statusAndReport}>
                            <div className={ProductDetailCSS.detailStatus}>
                                <div className={ProductDetailCSS.productDetailEnrollDateTime}>{timeForToday(productDetailInfos.enrollDateTime)}</div>
                                <div>&nbsp;·&nbsp;</div>
                                        <div className={ProductDetailCSS.productDetailViews}>조회 {productDetailInfos.viewCount}</div>
                                <div>&nbsp;·&nbsp;</div>
                                <div className={ProductDetailCSS.productDetailWish}>찜 {productDetailInfos.wishCount}</div>
                            </div>
                            <div className={ProductDetailCSS.reportBtnBox}>
                                <img src="/images/reportBtn.svg" alt=""/>&nbsp;
                                <div className={ProductDetailCSS.reportContent}>신고하기</div>
                            </div>
                            </div>
                            <div className={ProductDetailCSS.productDetailSellerHr}>판매자정보</div>
                            <div className={ProductDetailCSS.sellerInfoBox}>
                            <div className={ProductDetailCSS.sellerProfile}></div>
                            <div className={ProductDetailCSS.sellerInfo}>
                                <div className={ProductDetailCSS.sellerName}>{productDetailInfos.nickName}</div>
                                {/* <div className={ProductDetailCSS.otherProduct}>판매자의 다른 상품 보기</div> */}
                            </div>
                            </div>
                            <div className={ProductDetailCSS.detailBtn}>
                            <button onClick={onClickPickHandler} className={ButtonCSS.middleBtn2}>찜하기</button>
                            <button className={ButtonCSS.middleBtn3}>쪽지 보내기</button>
                            </div>
                        </div>
                    </div>
                    <div className={ProductDetailCSS.productInfoAndPlace}>
                        <div className={ProductDetailCSS.productDetailInfoTitle}>상품 정보</div>
                        <div className={ProductDetailCSS.productDetailInfoContent}>{productDetailInfos.productDesc}</div>
                        <div className={ProductDetailCSS.wishPlaceToTraceTitle}>거래희망장소</div>
                        <div className={ProductDetailCSS.wishPlaceToTraceContent}>{productDetailInfos.wishPlaceTrade}</div>
                    </div>
                    </div>
                </div>
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