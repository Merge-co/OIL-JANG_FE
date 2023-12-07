import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { callProductEditAPI } from '../../apis/ProductEditAPICalls';
import ProductList from '../../components/product/ProductList';
import { useLocation } from "react-router";
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product/ProductEdit.css'
import { priceToString } from '../../modules/ProductModule';



function ProductEdit() {
    const [productName, setProductName] = useState('');
    const [refCategoryCode, setRefCategoryCode] = useState('');
    const [priceOption, setPriceOption] = useState('sell');
    const [productPrice, setproductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [wishPlaceTrade, setWishPlaceTrade] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);  
    const [productNameLength, setProductNameLength] = useState(0);
    const [wishPlaceTradeLength, setWishPlaceTradeLength] = useState(0);



    const { productCode } = useParams();
    const navigate = useNavigate();
    const params = useParams();

    console.log('Received productCode', params.productCode);


    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/${productCode}`);
                const productData = response.data.results.productDetail[0];

                const receivedCategoryName = productData.categoryName;
                console.log('Received Category Name:', receivedCategoryName);

                const categoryCode = getCategoryCodeFromName(receivedCategoryName);

                const receivedCategoryCode = productData.categoryCode;
                console.log('Received Category Code:', receivedCategoryCode);

                setproductPrice(productData.productPrice.toString());
                setProductDesc(productData.productDesc);
                setProductName(productData.productName);
                setRefCategoryCode(productData.refCategoryCode);
                setWishPlaceTrade(productData.wishPlaceTrade);
                setRefCategoryCode(categoryCode);

                setDescriptionLength(productData.productDesc.length);
                setProductNameLength(productData.productName.length);
                setWishPlaceTradeLength(productData.wishPlaceTrade.length);

                if (parseInt(productData.productPrice, 10) === 0) {
                    setPriceOption('share');
                    setproductPrice('');
                } else {
                    setPriceOption('sell');
                    setproductPrice(productData.productPrice.toString());
                }

                console.log('API Response:', productData);
            } catch (error) {
                console.error('상품 정보를 가져오는 도중 에러 발생: ', error);
            }
        };

        if (productCode) {
            fetchProductInfo();
        }

    }, [productCode]);


    const handlePriceOptionChange = (option) => {
        setPriceOption(option);
        if (option === 'share') {
            setproductPrice('');
        }

    };

    const handlePriceChange = (event) => {
        if (priceOption === 'sell') {
            const enteredValue = event.target.value;
            const numericValue = enteredValue.replace(/[^0-9]/g, '');

            if (numericValue === '') {
                setproductPrice('');
                return;
            }
            const parsedValue = parseInt(numericValue, 10);
            if (parsedValue > 1000000000) {
                alert('10억 이상의 값은 입력할 수 없습니다.');
                return;
            }

            setproductPrice(numericValue);
        } else {
            setproductPrice(event.target.value);
        }
    };

    const handleProductNameChange = (event) => {
        const { value } = event.target;
        setProductName(value);
        setProductNameLength(value.length); // 상품명 길이 설정
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        setProductDesc(description); // 상품 설명 업데이트
        setDescriptionLength(description.length);
    };

    const handleWishPlaceTradeChange = (event) => {
        const { value } = event.target;
        setWishPlaceTrade(value);
        setWishPlaceTradeLength(value.length); // 거래 희망 장소 길이 설정
    };

    const getCategoryCodeFromName = (name) => {
        const foundCategory = categoryOptions.find(category => category.label === name);
        return foundCategory ? foundCategory.code : ''; // 해당하는 카테고리 이름이 없을 경우 빈 문자열 반환
    };



    const handleProductUpdate = async () => {
        console.log('productName:', productName);
        console.log('refCategoryCode:', refCategoryCode);
        console.log('productPrice:', productPrice);
        console.log('productDesc:', productDesc);
        console.log('wishPlaceTrade:', wishPlaceTrade);

        if (!productName) {
            alert('상품 이름을 입력해주세요.');
            return;
        }

        if (!productPrice && priceOption === 'sell') {
            alert('가격을 입력해주세요.');
            return;
        }

        if (!refCategoryCode) {
            alert('카테고리를 선택해주세요.');
            return;
        }

        if (!productDesc) {
            alert('상품 설명을 입력해주세요.');
            return;
        }

        if (!wishPlaceTrade) {
            alert('거래희망 장소를 입력해주세요.');
            return;
        }



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
            <div className='addDiv'>
                <div>
                    <h2 className='addproduct'>상품수정</h2>
                    <hr />
                    <div>
                        <div className='nameCount'>
                            <label htmlFor="product_name" id="product_name" className="font_all">
                                상품명 *
                            </label>
                            <h5 className='productLength'>{productNameLength}/50</h5>

                            <input
                                type="text"
                                name="product_name"
                                id="product_name"
                                className="input_box"
                                value={productName}
                                onChange={handleProductNameChange}
                                maxLength={50}
                                required
                            />
                        </div>
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

                    <hr />
                </div>
                <div className='pricing'>
                    <div className='sell_h1'>
                        <label className='priceFont'>가격 설정 *</label>
                        <div className='pricebtn'>
                            <label className='custom-radio' style={{ backgroundColor: priceOption === 'sell' ? '#222222' : '#C7C6C6' }}>
                                <input
                                    type='radio'
                                    name='price_option'
                                    value='sell'
                                    required
                                    checked={priceOption === 'sell'}
                                    onChange={() => handlePriceOptionChange('sell')}
                                />
                                판매하기
                            </label>
                            <label className='custom-radio' style={{ backgroundColor: priceOption === 'share' ? '#222222' : '#C7C6C6' }}>
                                <input
                                    type='radio'
                                    name='price_option'
                                    value='share'
                                    required
                                    checked={priceOption === 'share'}
                                    onChange={() => handlePriceOptionChange('share')}
                                />
                                나눔하기
                            </label>
                        </div>

                    </div>
                    <br />
                    <div className='wondiv'>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            className="shareBox"
                            placeholder={priceOption === 'share' ? '나눔입니다' : '가격을 입력하세요'}
                            disabled={priceOption === 'share'}
                            value={productPrice !== '' ? priceToString(productPrice).replace("원", '') : productPrice}
                            onChange={handlePriceChange}
                        />
                        <h3 className='priceWon'>원</h3>
                    </div>
                    <span id="priceInfo" style={{ display: priceOption === 'share' ? 'inline' : 'none' }}>
                    </span>

                    <hr />
                </div>
                {/* <div></div> */}
                <div className='product_box'>
                    <div className='descBox'>
                        <div className='descCount'>
                            <h3 htmlFor="product_description" className='product_description'>
                                상품 설명*
                            </h3>
                            <h5 className='descLength'>{descriptionLength}/300</h5>
                        </div>
                        <div className='dengerFont'>
                            <textarea
                                name="product_description"
                                id="product_description"
                                className='description'
                                placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요. 서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요. * 안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 오일장(주)가 함께 합니다."
                                value={productDesc}
                                onChange={handleDescriptionChange}
                                maxLength={300}
                            ></textarea>
                            <p className='danger'>*부적합한 게시글은 사전에 통보 없이 삭제 될 수 있음을 알려드립니다.</p>
                            <br />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='place'>
                    <div className='wishCount'>
                        <label htmlFor="wish_place_to_trade" className='placeFont'>
                            거래희망 장소*
                        </label>
                        <h5 className='wishCount'>{wishPlaceTradeLength}/50</h5>
                    </div>
                    <textarea
                        name="wish_place_to_trade"
                        id="wish_place_to_trade"
                        placeholder="위치 작성"
                        className='WishPlace'
                        value={wishPlaceTrade}
                        onChange={handleWishPlaceTradeChange}
                        maxLength={50}
                    ></textarea>
                    <hr />
                </div>
                <div className="btn_send">
                    <div className='btnAll'>
                        <button className='addbtn' onClick={handleProductUpdate}>수정</button>
                        <button className='canclebtn' onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductEdit; 