import WishListCSS from '../../styles/wishList/WishList.module.css'
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetWishListAPI, callWishListDeleteAPI } from '../../apis/WishListAPICalls';
import { getCookie } from '../../modules/CookieModule';
import PagingBar from './../../components/common/PagingBar';
import { onClickItemDetail, priceToString } from '../../modules/ProductModule';
import { useNavigate } from 'react-router-dom';


function WishList() {

    const dispatch = useDispatch();

    useEffect(
        () => {
            if(!getCookie("accessToken")) {
                alert("로그인 해주세요.");
            } else {
                dispatch(callGetWishListAPI());
            }
        },[]
    );

    const getWishListResult = useSelector(state => state.wishListReducer.getWishList);
    const pagingBtn = getWishListResult && getWishListResult.pagingBtn;
    const wishList = getWishListResult && getWishListResult.wishList;

    function WishListItem({wishListItem}) {
        return (
            <>  
                <div className={WishListCSS.wishListBox}>
                    <table>
                        <colgroup>
                            <col className={WishListCSS.colWidth25}/>
                            <col className={WishListCSS.colWidth10}/>
                            <col className={WishListCSS.colWidth20}/>
                            <col className={WishListCSS.colWidth10}/>
                            <col className={WishListCSS.colWidth20}/>
                            <col className={WishListCSS.colWidth15}/>
                        </colgroup>
                        <tr>
                            <th>사진</th>
                            <th>판매상태</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>상품설명</th>
                            <th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td><div onClick={() => onClickItem(wishListItem.productCode)} className={`${WishListCSS.wishListCursor} ${WishListCSS.wishListImg}`}></div></td>
                            <td>{wishListItem.sellStatus}</td>
                            <td className={WishListCSS.wishListCursor} onClick={() => onClickItem(wishListItem.productCode)} >{wishListItem.productName}</td>
                            <td>{priceToString(wishListItem.productPrice)}</td>
                            <td>{wishListItem.productDesc}</td>
                            <td><button onClick={() => onClickDelete(wishListItem.wishCode)} className={ButtonCSS.smallBtn2}>삭제</button></td>
                        </tr>
                    </table>
                </div>
            </>
        );
    }

    const onClickItem = productCode => {
        onClickItemDetail(productCode);
    }

    const onClickDelete = code => {
        if(window.confirm("관심목록에서 삭제하시겠습니까?")) {
            dispatch(callWishListDeleteAPI(code));
            alert("관심목록에서 삭제했습니다.");
        }
    }

    return (
        <>
            <div className={WishListCSS.wishListContainer}>
                <div className={WishListCSS.wishListTitle}>관심목록</div>
                {wishList && wishList.map(
                    wishListItem => <WishListItem wishListItem={wishListItem}/>
                )}
                <PagingBar pagingBtn={pagingBtn} />
            </div>
        </>  
    );
}

export default WishList;