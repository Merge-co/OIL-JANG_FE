import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetProductDetail } from '../../apis/ProductAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import UserProductDetailImg from './UserProductDetailImg';
import UsedProductDetailInfo from './UsedProductDetailInfo';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../modules/CookieModule';
import categoryArrow from '../../images/siteImage/categoryArrow.svg';
import homeIcon from '../../images/siteImage/home.svg';

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

    console.log(productDetailInfos)

    if(productDetailInfos && productDetailInfos.sellStatusCode === 3 && productDetailInfos.productCode == params.productCode) {
        alert("잘못된 페이지 접근입니다.");
        navigate("/usedProduct");
    } else if(!getCookie("accessToken") && productDetailInfos && productDetailInfos.sellStatusCode === 2 && productDetailInfos.productCode == params.productCode) {
        alert("잘못된 페이지 접근입니다.");
        navigate("/usedProduct");
    } else if(getCookie("accessToken") && productDetailInfos && productDetailInfos.sellStatusCode === 2 && productDetailInfos.productCode == params.productCode && productDetailInfos.refUserCode != jwtDecode(getCookie("accessToken")).userCode) {
        alert("잘못된 페이지 접근입니다.");
        navigate("/usedProduct");
    }

    const onClickHome = () => {
        navigate(`/`);
    }
    
    function ProductDetailInfo() {
        return (
            <>
                {productDetailInfos.sellStatusCode !== 3 &&
                <div className={ProductDetailCSS.productDetailContainer}>
                    <div className={ProductDetailCSS.productDetailBox}>
                        <div className={ProductDetailCSS.productDetailBox}>
                            <div className={ProductDetailCSS.productDirBox}>
                            <img onClick={() => onClickHome()} className={`${ProductDetailCSS.homeBtnCursor} ${ProductDetailCSS.productDirBtn}`}
                            src={homeIcon} height="24" alt=""/>
                                <div className={ProductDetailCSS.productDir1}>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;홈&nbsp;</div>
                                <img className={ProductDetailCSS.productDir1} src={categoryArrow} height="15" alt=""/>
                                <div className={ProductDetailCSS.productDirBtn}>&nbsp;{productDetailInfos.upperCategoryName}&nbsp;</div>
                                <img className={ProductDetailCSS.productDir1} src={categoryArrow} height="15" alt=""/>
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
                }
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