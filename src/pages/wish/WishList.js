import WishListCSS from '../../styles/wishList/WishList.module.css'
import ButtonCSS from '../../styles/Button.module.css';


function WishList() {
    return (
        <>
            <div className={WishListCSS.wishListContainer}>
                <div className={WishListCSS.wishListBox}>
                    <div className={WishListCSS.wishListTitle}>관심목록</div>
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
                            <td><div className={WishListCSS.wishListImg}></div></td>
                            <td>판매중</td>
                            <td>프라다</td>
                            <td>1250000원</td>
                            <td>상품설명</td>
                            <td><button className={ButtonCSS.smallBtn2}>삭제</button></td>
                        </tr>
                    </table>

                    <table>
                        <colgroup>
                            <col className={WishListCSS.colWidth25} />
                            <col className={WishListCSS.colWidth10} />
                            <col className={WishListCSS.colWidth20} />
                            <col className={WishListCSS.colWidth10} />
                            <col className={WishListCSS.colWidth20} />
                            <col className={WishListCSS.colWidth15} />
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
                            <td><div className={WishListCSS.wishListImg}></div></td>
                            <td>판매중</td>
                            <td>프라다</td>
                            <td>1250000원</td>
                            <td>상품설명</td>
                            <td><button className={ButtonCSS.smallBtn2}>삭제</button></td>
                        </tr>
                    </table> 
                </div>
            </div>
        </>  
    );
}

export default WishList;