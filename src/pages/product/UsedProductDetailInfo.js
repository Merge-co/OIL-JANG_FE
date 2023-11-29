import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { GET_WISHLIST_AGAIN, priceToString, timeForToday } from '../../modules/ProductModule';
import { getCookie } from '../../modules/CookieModule';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callProductDeleteAPI, callWishListRegistAPI } from '../../apis/ProductAPICalls';
import { useEffect, useState } from 'react';
import { callWishListDeleteAPI } from '../../apis/WishListAPICalls';
import Report from '../report/Report';
import MessageModal from '../message/MessagModal';


function UsedProductDetailInfo({productDetailInfos, wishLishRegisted, productDetail}) {
    const [wishLishRegist, setWishLishRegist] = useState(productDetail.selectedWishCode ? 1 : 0);


    const [modalType, setModalType] = useState("");

    useEffect(() => {
        console.log("modalType updated:", modalType);
    }, [modalType]);
    

    const onClickReportHandler = () => {
        if (getCookie("accessToken")) {
            setModalType('report');
            setModalOpen(true);
            console.log("report: " + modalType, getCookie("accessToken") )
        } else {
            alert("신고하려면 로그인 해야 합니다.");
        }
    }


    const onClickSendMessageHandler = () => {
        if (getCookie("accessToken")) {
            setModalType('message');
            setModalOpen(true);
            console.log("성공하면 찍힙니다")
            console.log("message: " + modalType,getCookie("accessToken") )
        } else {
            alert("쪽지를 보내려면 로그인 해야 합니다.");
        }
    }



    const [modalOpen, setModalOpen] = useState(false);

    function Buyer() {
        return(
            <>
                <button onClick={onClickPickHandler} className={wishLishRegist === 1 ? ButtonCSS.middleBtn2 : ButtonCSS.middleBtn1}>{wishLishRegist === 1 ? "❤️ 찜해제" : "🤍 찜하기"}</button>
                <button onClick={() => onClickSendMessageHandler()} className={ButtonCSS.middleBtn3}>쪽지 보내기</button>
            </>
        );
    }

    function Seller() {
        return(
            <>
                <button onClick={onClickRemoveHandler} className={ButtonCSS.middleBtn2}>삭제하기</button>
                <button onClick={onClickEditHandler} className={ButtonCSS.middleBtn3}>수정하기</button>
            </>
        );
    }


    const onClickRemoveHandler = () => {
        if (window.confirm("상품을 삭제하시겠습니까?")) {
            dispatch(callProductDeleteAPI(params.productCode));
            navigate(`/usedProduct`);
            alert("상품을 삭제했습니다.");
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickEditHandler = () => {
        navigate(`/productEdit/${params.productCode}`)
    }

    const [plusMinusCount, setPlusMinusCount] = useState(0);
    const params = useParams();

    const wishListRegistNo = useSelector(state => state.productReducer.getWishListRegistResult);

    const onClickPickHandler = () => {
        if (getCookie("accessToken")) {
            if (wishLishRegist === 0) {
                dispatch(callWishListRegistAPI(params.productCode));
                if(plusMinusCount === 0) {
                    setPlusMinusCount(1);
                } else {
                    setPlusMinusCount(0);
                }
                setWishLishRegist(1);
            } else {
                dispatch(callWishListDeleteAPI(wishListRegistNo ? wishListRegistNo : productDetail.selectedWishCode[0]));
                
                if(plusMinusCount === 0) {
                    setPlusMinusCount(-1);
                } else {
                    setPlusMinusCount(0);
                }
                setWishLishRegist(0);
            }
            dispatch({ type: GET_WISHLIST_AGAIN, payload: 1});
        } else {
            alert("찜하려면 로그인 해야 합니다.");
        }
    }

    return (
        <>
            <div className={ProductDetailCSS.productDetailRight}>
                <div className={ProductDetailCSS.productDetailName}>{productDetailInfos.productName}</div>
                <div className={ProductDetailCSS.productDetailPriceBox}>
                    <div className={ProductDetailCSS.productDetailPrice}>
                        {priceToString(productDetailInfos.productPrice).replace("원","")}</div>
                        <div className={ProductDetailCSS.productDetailWon}>원
                    </div>
                </div>
                <div className={ProductDetailCSS.detailHr}></div>
                <div className={ProductDetailCSS.statusAndReport}>
                    <div className={ProductDetailCSS.detailStatus}>
                        <div className={ProductDetailCSS.productDetailEnrollDateTime}>{timeForToday(productDetailInfos.enrollDateTime)}</div>
                        <div>&nbsp;·&nbsp;</div>
                        <div className={ProductDetailCSS.productDetailViews}>조회 {productDetailInfos.viewCount}</div>
                        <div>&nbsp;·&nbsp;</div>
                        <div className={ProductDetailCSS.productDetailWish}>찜 {productDetailInfos.wishCount + plusMinusCount}</div>
                    </div>
                    <div onClick={() => onClickReportHandler()} className={ProductDetailCSS.reportBtnBox}>
                        <img src="/images/siteImage/reportBtn.svg" alt=""/>&nbsp;
                        <div className={`${ProductDetailCSS.reportContent}`} >신고하기</div>
                    </div>
                </div>
                <div className={ProductDetailCSS.productDetailSellerHr}>판매자정보</div>
                <div className={ProductDetailCSS.sellerInfoBox}>
                    <img src={productDetailInfos && productDetailInfos.userImageThumbAddr} alt="판매자 정보" className={ProductDetailCSS.sellerProfile} />
                    <div className={ProductDetailCSS.sellerInfo}>
                        <div className={ProductDetailCSS.sellerName}>{productDetailInfos.nickName}</div>
                        {/* <div className={ProductDetailCSS.otherProduct}>판매자의 다른 상품 보기</div> */}
                    </div>
                </div>
                
                <div className={ProductDetailCSS.detailBtn}>
                    {getCookie("accessToken") && (jwtDecode(getCookie("accessToken")).userCode === productDetailInfos.refUserCode) ? <Seller/> : <Buyer/>}
                </div>
            </div>
            {modalType === 'report' && modalOpen && getCookie("accessToken") && <Report nickName={productDetailInfos.nickName} productCode={productDetailInfos.productCode} sellStatus={productDetailInfos.sellStatusCode} productName={productDetailInfos.productName} setModalOpen={setModalOpen} />}
            {modalType === 'message' && modalOpen && getCookie("accessToken") && <MessageModal setModalOpen={setModalOpen}/>}
        </>
    );
}

export default UsedProductDetailInfo;