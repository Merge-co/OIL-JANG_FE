import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { GET_WISHLIST_DELELE_RESULT, priceToString, timeForToday } from '../../modules/ProductModule';
import { getCookie } from '../../modules/CookieModule';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callProductDeleteAPI, callWishListRegistAPI } from '../../apis/ProductAPICalls';
import { useEffect, useState } from 'react';
import { callWishListDeleteAPI } from '../../apis/WishListAPICalls';
import Report from '../report/Report';
import MessageModal from '../message/MessagModal';
import reportBtn from '../../images/siteImage/reportBtn.svg';

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
            navigate(`/login`);
        }
    }

    const onClickSendMessageHandler = () => {
        if (getCookie("accessToken")) {
            setModalType('message');
            setModalOpen(true);
            console.log("성공하면 찍힙니다")
            console.log("message: " + modalType,getCookie("accessToken") )
        } else {
            navigate(`/login`);
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
            alert("상품을 삭제했습니다.");
            navigate(`/usedProduct`);
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
    const wishListDeleteResult = useSelector(state => state.productReducer.getWishListDeleteResult);

    useEffect(
        () => {
            if(wishListDeleteResult) {
                dispatch({ type: GET_WISHLIST_DELELE_RESULT, payload: 0});
                setIsSeding(false);
            }
        },[wishListDeleteResult]
    )

    useEffect(
        () => {
            if(wishListRegistNo) {
                setIsSeding(false); 
            }
        },[wishListRegistNo]
    )

    const [ isSending, setIsSeding ] = useState(false);

    const onClickPickHandler = () => {
        if (getCookie("accessToken")) {
            if (wishLishRegist === 0 && !isSending) {
                dispatch(callWishListRegistAPI(params.productCode));
                setIsSeding(true);
                setWishLishRegist(1);
                if(plusMinusCount === 0) {
                    setPlusMinusCount(1);
                } else {
                    setPlusMinusCount(0);
                }
            } else if(!isSending) {
                dispatch(callWishListDeleteAPI(wishListRegistNo ? wishListRegistNo : productDetail.selectedWishCode));
                setIsSeding(true);
                setWishLishRegist(0);
                if(plusMinusCount === 0) {
                    setPlusMinusCount(-1);
                } else {
                    setPlusMinusCount(0);
                }
            }
        } else {
            navigate(`/login`);
        }
    }

    const userImageThumbAddr = productDetailInfos.userImageThumbAddr
  ? productDetailInfos.userImageThumbAddr.replace(
      "C:\\OIL-JANG_FE\\public",
      ""
    ) : "";
 

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
                    {!getCookie("accessToken") || getCookie("accessToken") && (jwtDecode(getCookie("accessToken")).userCode !== productDetailInfos.refUserCode) ? <div onClick={() => onClickReportHandler()} className={ProductDetailCSS.reportBtnBox}>
                        <img src={reportBtn} alt=""/>&nbsp;
                        <div className={`${ProductDetailCSS.reportContent}`} >신고하기</div>
                    </div> : ""}
                </div>
                <div className={ProductDetailCSS.productDetailSellerHr}>판매자정보</div>
                <div className={ProductDetailCSS.sellerInfoBox}>
                    <img src={productDetailInfos && userImageThumbAddr} alt="판매자 정보" className={ProductDetailCSS.sellerProfile} />
                    <div className={ProductDetailCSS.sellerInfo}>
                        <div className={ProductDetailCSS.sellerName}>{productDetailInfos.nickName}</div>
                        {/* <div className={ProductDetailCSS.otherProduct}>판매자의 다른 상품 보기</div> */}
                    </div>
                </div>
                
                <div className={ProductDetailCSS.detailBtn}>
                    {getCookie("accessToken") && (jwtDecode(getCookie("accessToken")).userCode === productDetailInfos.refUserCode) ? <Seller/> : <Buyer/>}
                </div>
            </div>
            {modalType === 'report' && modalOpen && getCookie("accessToken") && <Report nickName={productDetailInfos.nickName} productCode={productDetailInfos.productCode} sellStatus={productDetailInfos.sellStatusCode} productName={productDetailInfos.refUserCode} setModalOpen={setModalOpen} />}
            {modalType === 'message' && modalOpen && getCookie("accessToken") && <MessageModal setModalOpen={setModalOpen}/>}
        </>
    );
}

export default UsedProductDetailInfo;