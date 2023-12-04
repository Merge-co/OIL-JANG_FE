import React, { useState, useEffect } from 'react';
import WishListCSS from '../../styles/wishList/WishList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { callGetMyProductListAPI } from '../../apis/MyProductAPICalls';
import { fetchMyProductListStart, fetchMyProductListSuccess, fetchMyProductListFailure } from '../../modules/SellingListModule';
import { useNavigate } from 'react-router-dom';
import { onClickItemDetail } from '../../modules/ProductModule';
import PagingBar from '../../components/common/PagingBar';
import '../../styles/product/MyProductList.css'


function MyProductList() {
    const dispatch = useDispatch();
    const [myProductList, setMyProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const navigate = useNavigate();

    const onChangeSellStatus = async (code, event) => {
        const updatedStatus = event.target.value;
        const confirmMessage = `판매 상태를 변경하시겠습니까?`;

        if (window.confirm(confirmMessage)) {
            try {
                // 서버에 판매 상태 업데이트 요청
                // callUpdateSellStatusAPICalls(code, updatedStatus);
                const updatedProductList = myProductList.sellingList.map(product =>
                    product.productCode === code ? { ...product, sellStatus: updatedStatus } : product
                );
                setMyProductList({ ...myProductList, sellingList: updatedProductList });
            } catch (error) {
                // 오류 처리
            }

        } else {

        }

    };

    useEffect(() => {
        async function fetchData() {
            try {
                const productList = await callGetMyProductListAPI();
                setMyProductList(productList);
                setLoading(false);

                // Redux 액션 dispatch
                dispatch(fetchMyProductListSuccess(productList));
            } catch (error) {
                setError('상품 목록을 불러오는 중 에러가 발생했습니다.');
                setLoading(false);
                dispatch(fetchMyProductListFailure(error.message));
            }

            console.log(myProductList);
        }

        dispatch(fetchMyProductListStart());
        fetchData();
    }, [dispatch, PagingInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const onclickHandler = (code) => {
        navigate(`/usedProduct/${code}`)
    }

    function getStatusString(sellStatus) {
        return sellStatus === 1 ? '판매중' : '판매완료';
    }

    const pagingBtn = myProductList && myProductList.pagingBtn;


    return (
        <div className='WishList_wishListContainer__58dVO'>
            <div className={WishListCSS.wishListTitle}>내 판매목록</div>
            <div className='productListBox'>
                {myProductList.sellingList.length === 0 ? (
                    <div>등록된 상품이 없습니다.</div>
                ) : (
                    <>
                        <table>
                            <colgroup>
                                <col className={WishListCSS.colWidth25} />
                                <col className={WishListCSS.colWidth10} />
                                <col className={WishListCSS.colWidth20} />
                                <col className={WishListCSS.colWidth10} />
                                <col className={WishListCSS.colWidth20} />
                                <col className={WishListCSS.colWidth15} />
                            </colgroup>
                            <thead className='productListLine'>
                                <tr>
                                    <th className='productListTh'>등록번호</th>
                                    <th className='productListTh'>사진</th>
                                    <th className='productListTh'>상품명</th>
                                    <th className='productListTh'>가격</th>
                                    <th className='productListTh'>관심</th>
                                    <th className='productListTh'>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(myProductList)}
                                {myProductList && myProductList.sellingList.map(product => (
                                    <tr key={product.productCode} className='tableName'>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.productCode}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                <img src={product.image} alt="상품 이미지" />
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.productName}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.productPrice}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.wishCount}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <select value={product.sellStatus} onChange={(e) => onChangeSellStatus(product.productCode, e)} className='productState'>
                                                <option value="판매중">판매중</option>
                                                <option value="판매완료">판매완료</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='productListBtn'>
                            <PagingBar pagingBtn={pagingBtn} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default MyProductList;