import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { callProductEditAPI } from '../../apis/ProductEditAPICalls';
import ProductList from '../../components/product/ProductList';
import { useLocation } from "react-router";
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product/ProductEdit.css'


function ProductEdit() {
    const [productName, setProductName] = useState('');
    const [refCategoryCode, setRefCategoryCode] = useState('');
    const [priceOption, setPriceOption] = useState('sell');
    const [productPrice, setproductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [wishPlaceTrade, setWishPlaceTrade] = useState('');

    const { productCode } = useParams();
    const navigate = useNavigate();


    const params = useParams();
    console.log('Received productCode', params.productCode);


    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/${productCode}`);
                const productData = response.data.results.productDetail[0];

                setproductPrice(productData.productPrice.toString());
                setProductDesc(productData.productDesc);
                setProductName(productData.productName);
                setRefCategoryCode(productData.refCategoryCode);
                setWishPlaceTrade(productData.wishPlaceTrade);

                console.log('API Response:', productData);
            } catch (error) {
                console.error('상품 정보를 가져오는 도중 에러 발생: ', error);
            }
        };
        fetchProductName();
    }, []);


    const handlePriceOptionChange = (option) => {
        setproductPrice(option);
        setPriceOption(option === 'share' ? '' : productPrice);
    };

    const handlePriceChange = (event) => {
        setproductPrice(event.target.value);
    };


    const handleProductUpdate = async () => {
        console.log('productName:', productName);
        console.log('refCategoryCode:', refCategoryCode);
        console.log('productPrice:', productPrice);
        console.log('productDesc:', productDesc);
        console.log('wishPlaceTrade:', wishPlaceTrade);

        if (!params.productCode) {
            console.error('Product code is missing.');
            return;
        }

        const updatedFields = {
            productDesc: productDesc || '', // productDesc가 undefined이면 빈 문자열로 설정
            productName: productName || '', // productName이 undefined이면 빈 문자열로 설정
            productPrice: productPrice || '', // price가 NaN이면 0으로 설정
            refCategoryCode: refCategoryCode || '', // refCategoryCode가 undefined이면 빈 문자열로 설정
            wishPlaceTrade: wishPlaceTrade || '',
        };
        console.log('Product Code:', params.productCode);
        console.log('Updated Fields:', updatedFields);



        try {
            await callProductEditAPI(params.productCode, updatedFields);
            console.log('Received productCode:', productCode);
            console.log('Received updatedFields:', updatedFields);
            console.log('상품 수정 완료');
            alert('상품 수정이 완료되었습니다. 메인페이지로 이동합니다.')
            navigate('/');
        } catch (error) {
            console.error('상품 수정 중 에러 발생:', error);
        }
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm('상품 수정을 취소하시겠습니까?');
        if (confirmCancel) {
            navigate(-1);
        }

    };



    const categoryOptions = [
        { code: 1, label: "카테고리를 선택해주세요" },
        { code: 6, label: "블라우스" },
        { code: 7, label: "셔츠" },
        { code: 8, label: "반팔 티셔츠" },
        { code: 9, label: "긴팔 티셔츠" },
        { code: 10, label: "민소매 티셔츠" },
        { code: 11, label: "니트/스웨터" },
        { code: 12, label: "맨투맨" },
        { code: 13, label: "패딩" },
        { code: 14, label: "점퍼" },
        { code: 15, label: "코트" },
        { code: 16, label: "자켓" },
        { code: 17, label: "기다건" },
        { code: 18, label: "조끼/베스트" },
        { code: 19, label: "후드티/후드집업" },
        { code: 20, label: "데님/청바지" },
        { code: 21, label: "슬랙스" },
        { code: 22, label: "면바지" },
        { code: 23, label: "반바지" },
        { code: 24, label: "트레이닝/조거팬츠" },
        { code: 25, label: "레깅스" },
        { code: 26, label: "기타 바지" },
        { code: 27, label: "롱 스커트" },
        { code: 28, label: "미디 스커트" },
        { code: 29, label: "미니 스커트" },
        { code: 30, label: "롱 원피스" },
        { code: 31, label: "미디 원피스" },
        { code: 32, label: "미니 원피스" },
    ];

    return (
        <>
            <div>
                <div className='addDiv'>
                    <h3>상품수정</h3>
                    <hr />
                    <div>
                        <label htmlFor="product_name" id="product_name" className="font_all">
                            상품명 *
                        </label>
                        <input
                            type="text"
                            name="product_name"
                            id="product_name"
                            className="input_box"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                        <br />
                        <div className='Category'>
                            <label htmlFor="ref_category" id="ref_category" className="font_all">
                                카테고리 *
                            </label>
                            <select
                                name="ref_category_code"
                                id="ref_category_code"
                                className="EditCategory"
                                value={refCategoryCode}
                                onChange={(e) => setRefCategoryCode(e.target.value)}
                                required
                            >
                                <option value="" disabled>카테고리를 선택하세요</option>
                                {categoryOptions.map((category) => (
                                    <option key={category.code} value={category.code}>{category.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="image-preview-container"></div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="pricing">
                <div className="sell_h1">
                    <label className="font_all">가격 설정 *</label>
                    <div className="btn_two">
                    <label className='custom-radio' style={{ backgroundColor: priceOption === 'sell' ? '#222222' : '#C7C6C6' }}>
                            <input
                                type="radio"
                                name="price_option"
                                value={productPrice}
                                required
                                checked={priceOption === 'sell'} // 추가된 부분
                                onChange={() => handlePriceOptionChange('sell')}
                            />
                            판매하기
                        </label>
                        <label className='custom-radio' style={{ backgroundColor: priceOption === 'share' ? '#222222' : '#C7C6C6' }}>
                            <input
                                type="radio"
                                name="price_option"
                                value="share"
                                required
                                checked={priceOption === 'share'} // 추가된 부분
                                onChange={() => handlePriceOptionChange('share')}
                            />
                            나눔하기
                        </label>
                    </div>
                </div>
                <br />
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="input_box"
                    placeholder={priceOption === 'share' ? '나눔입니다' : '가격을 입력하세요'}
                    disabled={priceOption === 'share'}
                    value={productPrice}
                    onChange={(e) => setproductPrice(e.target.value)}
                />

                <span id="priceInfo" style={{ display: priceOption === 'share' ? 'inline' : 'none' }}>

                </span>

            </div>
            <div className="explanation">
                <label htmlFor="product_description" className="font_all">
                    상품 설명*
                </label>
                <textarea
                    name="product_description"
                    id="product_description"
                    placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요. 서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요. * 안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 오일장(주)가 함께 합니다."
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                ></textarea>
                <br />
                <p>*부적합한 게시글은 사전에 통보 없이 삭제 될 수 있음을 알려드립니다.</p>
                <hr />
            </div>
            <div className="location">
                <label htmlFor="wish_place_to_trade" className="font_all">
                    거래희망 장소*
                </label>
                <textarea
                    name="wish_place_to_trade"
                    id="wish_place_to_trade"
                    placeholder="위치 작성"
                    value={wishPlaceTrade}
                    onChange={(e) => setWishPlaceTrade(e.target.value)}
                ></textarea>
                <hr />
            </div>
            <div className="btn_send">
                <div className="btn_all">
                    <button className='editbtn' onClick={handleProductUpdate}>수정</button>
                    <button className='editcancle' onClick={handleCancel}>취소</button>
                </div>
            </div>
        </>
    );
};
export default ProductEdit;