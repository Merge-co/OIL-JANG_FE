import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import ButtonCSS from '../../styles/Button.module.css';

function UsedProductDetail() {
    return (
                <>
            <div className={ProductDetailCSS.productDetailBox}>
                <div className={ProductDetailCSS.productDetailBox}>
                    <div className={ProductDetailCSS.productDirBox}>
                    <img className={ProductDetailCSS.productDirBtn} src="/images/home.svg" height="24" alt=""/><div className={ProductDetailCSS.productDir1}>
                    <div className={ProductDetailCSS.productDirBtn}>&nbsp;홈&nbsp;</div>
                    <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                    <div className={ProductDetailCSS.productDirBtn}>&nbsp;아웃터&nbsp;</div>
                    <img className={ProductDetailCSS.productDir1} src="/images/categoryArrow.svg" height="15" alt=""/>
                    <div className={ProductDetailCSS.productDirBtn}>&nbsp;패딩&nbsp;</div>
                    </div>
                </div>
                    <div className={ProductDetailCSS.productDetailBoth}>
                    <div className={ProductDetailCSS.productDetailLeftImage}></div>
                    <div className={ProductDetailCSS.productDetailRight}>
                        <div className={ProductDetailCSS.productDetailName}>좋은 패딩</div>
                        <div className={ProductDetailCSS.productDetailPriceBox}>
                        <div className={ProductDetailCSS.productDetailPrice}>63,500</div><div className={ProductDetailCSS.productDetailWon}>원</div>
                        </div>
                        <div className={ProductDetailCSS.detailHr}></div>
                        <div className={ProductDetailCSS.statusAndReport}>
                        <div className={ProductDetailCSS.detailStatus}>
                            <div className={ProductDetailCSS.productDetailEnrollDateTime}>5분 전</div>
                            <div>&nbsp;·&nbsp;</div>
                            <div className={ProductDetailCSS.productDetailViews}>조회 1</div>
                            <div>&nbsp;·&nbsp;</div>
                            <div className={ProductDetailCSS.productDetailWish}>찜 0</div>
                        </div>
                        <div className={ProductDetailCSS.reportBtnBox}>
                            <img src="images/reportBtn.svg" alt=""/>&nbsp;
                            <div className={ProductDetailCSS.reportContent}>신고하기</div>
                        </div>
                        </div>
                        <div className={ProductDetailCSS.productDetailSellerHr}>판매자정보</div>
                        <div className={ProductDetailCSS.sellerInfoBox}>
                        <div className={ProductDetailCSS.sellerProfile}></div>
                        <div className={ProductDetailCSS.sellerInfo}>
                            <div className={ProductDetailCSS.sellerName}>판매자이름</div>
                            <div className={ProductDetailCSS.otherProduct}>판매자의 다른 상품 보기</div>
                        </div>
                        </div>
                        <div className={ProductDetailCSS.detailBtn}>
                        <button className={ButtonCSS.middleBtn2}>찜하기</button>
                        <button className={ButtonCSS.middleBtn3}>쪽지 보내기</button>
                        </div>

                    </div>
                </div>
                <div className={ProductDetailCSS.productInfoAndPlace}>
                    <div className={ProductDetailCSS.productDetailInfoTitle}>상품 정보</div>
                    <div className={ProductDetailCSS.productDetailInfoContent}>최대 1000 / 0 자</div>
                    <div className={ProductDetailCSS.wishPlaceToTraceTitle}>거래희망장소</div>
                    <div className={ProductDetailCSS.wishPlaceToTraceContent}>강동구 ○○타워</div>
                </div>
                </div>
            </div>
        </>
    );
}

export default UsedProductDetail;