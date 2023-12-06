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

    const onChangeSellStatus = async (productCode, event) => {
        const updatedStatus = event.target.value;
        const confirmMessage = `판매완료를 선택하신면 수정이 불가능 합니다. 정말로 판매완료를 하시겠습니까?`;

        if (window.confirm(confirmMessage)) {
            try {
                const response = await fetch(`http://localhost:8000/products/${productCode}/soldOut`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // 추가적인 헤더 정보를 설정할 수 있습니다.
                    },
                    body: JSON.stringify({ productCode, sellStatus: updatedStatus }),
                });

                if (response.ok) {
                    const updatedProductList = myProductList.sellingList.map(product => {
                        if (product.productCode === productCode) {
                            return { ...product, sellStatus: updatedStatus };
                        }
                        return product;
                    });
                    setMyProductList({ ...myProductList, sellingList: updatedProductList });
                } else {
                    throw new Error('상태 변경 실패');
                }
            } catch (error) {
                console.error('상태 변경 중 에러 발생:', error);
            }
        } else {
            // 사용자가 '취소'를 누른 경우의 로직을 작성할 수 있습니다.
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
            {/* <div className={WishListCSS.wishListTitle} style={{color:"#222222"}}>내 판매목록</div> */}
            <div style={{ width: '70%', margin: '0 auto', userSelect: 'none' }}>
                <h1 style={{ color: "#222222" }}>내 판매 목록</h1>
                <hr />
            </div>
            <div className='productListBox'>
                {myProductList.sellingList.length === 0 ? (
                    <div className='noItem'>등록된 상품이 없습니다.</div>
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
                                                <img src={product.productThumbAddr} alt="상품 이미지" width={180} height={152} />
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.productName}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.productPrice.toLocaleString()}원
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <div onClick={() => onclickHandler(product.productCode)}>
                                                {product.wishCount}
                                            </div>
                                        </td>
                                        <td className='tableName'>
                                            <select
                                                value={product.sellStatus}
                                                onChange={(e) => onChangeSellStatus(product.productCode, e)}
                                                className='productState'
                                                disabled={product.sellStatus === '판매완료'}
                                            >
                                                <option value="판매중" style={{ color: "#222222" }}>판매중</option>
                                                <option value="판매완료" style={{ color: "#222222" }}>판매완료</option>
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