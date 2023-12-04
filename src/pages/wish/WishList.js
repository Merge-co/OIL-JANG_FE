import WishListCSS from '../../styles/wishList/WishList.module.css'
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetWishListAPI, callWishListDeleteAPI } from '../../apis/WishListAPICalls';
import PagingBar from './../../components/common/PagingBar';
import { GET_WISHLIST_AGAIN, onClickItemDetail, priceToString } from '../../modules/ProductModule';
import { useRef } from 'react';
import { GET_PAGING } from '../../modules/PagingModule';


function WishList() {

    const dispatch = useDispatch();

    const wishListReset = useSelector(state => state.productReducer.getWishListAgain);
    const PagingInfo = useSelector(state => state.pagingReducer);
    
    const getWishListResult = useSelector(state => state.wishListReducer.getWishList);
    const pagingBtn = getWishListResult && getWishListResult[0].pagingBtn;
    const wishList = getWishListResult && getWishListResult[0].wishList;
   
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get("page");

    const rendered = useRef();
    const requestUrl = getWishListResult && getWishListResult[1];

    useEffect(
        () => {
            if (!pageParam && PagingInfo != 0) {
                dispatch({ type: GET_PAGING, payload: 0 });
            }      

            if (rendered.current !== window.location.href) {
                dispatch(callGetWishListAPI());
            }

            rendered.current = window.location.href;

        },[PagingInfo, wishListReset]
    );

    function WishListItem({wishListItem}) {
        return (           
            <>  
                <tr>
                    <td onClick={() => onClickItem(wishListItem.productCode)} className={WishListCSS.wishListCursor}><img className={`${WishListCSS.wishListCursor} ${WishListCSS.wishListImg}`} src={wishListItem.proImageThumbAddr} alt="상품 이미지" width="179" height="152"/></td>
                    <td onClick={() => onClickItem(wishListItem.productCode)} className={WishListCSS.wishListCursor}>{wishListItem.sellStatus}</td>
                    <td onClick={() => onClickItem(wishListItem.productCode)} className={WishListCSS.wishListCursor}>{wishListItem.productName}</td>
                    <td onClick={() => onClickItem(wishListItem.productCode)} className={WishListCSS.wishListCursor}>{priceToString(wishListItem.productPrice)}</td>
                    <td onClick={() => onClickItem(wishListItem.productCode)} className={WishListCSS.wishListCursor}><div className={WishListCSS.productDescLeft}>{wishListItem.productDesc}</div></td>
                    <td><button onClick={() => onClickDelete(wishListItem.wishCode)} className={ButtonCSS.smallBtn2}>삭제</button></td>
                </tr>
            </>
        );
    }
    // src={wishListItem.proImageThumbAddr}
    const onClickItem = productCode => {
        onClickItemDetail(productCode);
    }

    const onClickDelete = code => {
        if(window.confirm("관심목록에서 삭제하시겠습니까?")) {
            dispatch(callWishListDeleteAPI(code));
            alert("관심목록에서 삭제했습니다.");
            dispatch({ type: GET_WISHLIST_AGAIN, payload: 1});
        }
    }

    function WishListContent() {
        return (
            <>
                <div style={{width:'70%', margin: '0 auto'}}>
                    <h1>관심목록</h1>
                    <hr/>
                </div>
                <div className={WishListCSS.wishListContainer}>
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
                            <thead>
                                <tr>
                                    <th>사진</th>
                                    <th>판매상태</th>
                                    <th>상품명</th>
                                    <th>가격</th>
                                    <th>상품설명</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishList && wishList.map(
                                    wishListItem => <WishListItem key={wishListItem.productCode} wishListItem={wishListItem}/>
                                )}
                            </tbody>
                            
                        </table>
                    </div>
                    {(wishList && wishList.length == 0) && <div className={WishListCSS.noResult}>찜한 상품이 없습니다</div>}
                    {getWishListResult && <PagingBar pagingBtn={pagingBtn} />}
                </div>
            </>  
        );
    }

    return (
        <>
            {(requestUrl === rendered.current || PagingInfo) != 0 && <WishListContent/>}
        </>  
    );
}

export default WishList;