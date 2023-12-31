import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { callProductRegistAPI } from '../../apis/SellingAPICalls';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../modules/CookieModule';
import { useNavigate } from 'react-router-dom';
import '../../styles/product/AddProduct.css'
import { priceToString } from '../../modules/ProductModule';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [imageCount, setImageCount] = useState(0);
    const [priceOption, setPriceOption] = useState('sell');
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [refCategoryCode, setRefCategoryCode] = useState(null);
    const [productThumbAddr, setProductThumbAddr] = useState(null);
    const [productDesc, setProductDesc] = useState(null);
    const [wishPlaceTrade, setWishPlaceTrade] = useState(null);

    const MAX_DESCRIPTION_LENGTH = 300;
    const [description, setDescription] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];



    const navigate = useNavigate();


    const MAX_IMAGES = 5;

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        updateImageCount(newImages);
    };

    const updateImageCount = (imageList) => {
        setImageCount(imageList.length);
    };

    const handlePriceOptionChange = (option) => {
        setPriceOption(option);
        setPrice(option === 'share' ? '' : price);
    };

    const handlePriceChange = (event) => {
        if (priceOption === 'sell') {
            const inputValue = event.target.value;
            const numericValue = inputValue.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거


            if (numericValue > 1000000000) {
                alert('10억 이상의 값은 입력할 수 없습니다.');
                return;
            }

            setPrice(numericValue !== '' ? parseInt(numericValue) : 0);
        }
    };


    const handleImageUpload = (event) => {
        const selectedImages = event.target.files;
        const newImages = [...images];
        console.log("newImages", newImages)

        if (newImages.length + selectedImages.length > MAX_IMAGES) {
            alert(`더 이상 ${MAX_IMAGES}개 이상의 이미지를 업로드할 수 없습니다.`);
            return;
        }

        for (let i = 0; i < selectedImages.length; i++) {
            const fileType = selectedImages[i].type;

            if (!allowedFileTypes.includes(fileType)) {
                alert('올바른 이미지 파일 형식 입니다(jpeg, jpg, png)만 업로드 가능합니다.');
                return;
            }
        }

        for (let i = 0; i < selectedImages.length; i++) {
            newImages.push(selectedImages[i]);
        }

        setImages(newImages);
        updateImageCount(newImages);
    };
    const handleDescriptionChange = (e) => {
        const inputDescription = e.target.value;
        if (inputDescription.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(inputDescription);
            setDescriptionLength(inputDescription.length);
            setProductDesc(inputDescription);
        } else {
            alert('300자 이내로 작성해주세요.');
        }
        setDescription(inputDescription);
        setDescriptionLength(inputDescription.length);
        setProductDesc(inputDescription);
        setProductDesc(e.target.value);
    };

    const handleWish = (e) => {
        setWishPlaceTrade(e.target.value);
    }

    const handleFormSubmit = async () => {
        const formData = new FormData();
        const refUserCode = jwtDecode(getCookie("accessToken")).userCode;
        formData.append('productName', productName);
        formData.append('productDescription', productDesc !== null ? productDesc : null);
        formData.append('refCategoryCode', refCategoryCode !== null ? refCategoryCode : 24);
        formData.append('productPrice', price == "" ? 0 : price);
        formData.append('productThumbAddr', productThumbAddr !== null ? productThumbAddr : '');
        formData.append('productDesc', productDesc !== null ? productDesc : '');
        formData.append('wishPlaceTrade', wishPlaceTrade !== null ? wishPlaceTrade : '');
        formData.append('refUserCode', refUserCode);
        formData.append('sellStatusCode', 1);


        if (!productName || productName.trim() === '') {
            alert('상품명을 입력해주세요.');
            return;
        }

        if (images.length < 1) {
            alert('최소 1장의 이미지를 올려주세요.'); // 이미지가 업로드되지 않은 경우 알림 표시
            return;
        }
        if (images.length > MAX_IMAGES) {
            alert(`더 이상 ${MAX_IMAGES}개 이상의 이미지를 업로드할 수 없습니다.`);
            return;
        }

        if (!refCategoryCode) {
            alert('카테고리를 선택해주세요.');
            return;
        }

        // if (!price || price.trim() === '') {
        //     alert('가격을 입력해주세요.');
        //     return;
        // }

        if (!productDesc || productDesc.trim() === '') {
            alert('상품 설명을 입력해주세요.');
            return;
        }

        if (!wishPlaceTrade || wishPlaceTrade.trim() === '') {
            alert('거래 희망 장소를 입력해주세요.');
            return;
        }


        // 나머지 form 데이터 추가
        // formData.append("다른필드명", form.다른필드명);
        // 콘솔에 FormData를 API 호출 직전에 로그로 출력
        console.log('FormData:', formData);

        for (let i = 0; i < images.length; i++) {
            formData.append(`imagesFiles`, images[i]);
        }
        console.log(wishPlaceTrade);
        let values = formData.values();
        for (const pair of values) {
            console.log(pair);
        }


        try {
            const response = await axios.post('http://localhost:8000/products', formData).then(
                response => {
                    if (response.status === 200) {
                        console.log('상품이 성공적으로 등록되었습니다.');
                        setImageCount(0);
                        setPriceOption('sell');
                        setPrice('');
                        setImages([]);
                        setProductName('');
                        setProductDesc('');
                        setRefCategoryCode(null);
                        window.navigator.vibrate(200);
                        window.alert('상품이 등록되었습니다. 메인페이지로 이동합니다');
                        navigate('/');
                    } else {
                        console.error('상품 등록에 실패했습니다.', response.data);
                    }
                }
            );

           
        } catch (error) {
            console.error('API 호출 중 오류가 발생했습니다.', error);
        }
    };


    const handleCancel = () => {
        setImageCount(0);
        setPriceOption('sell');
        setPrice('');
        setImages([]);
        setProductName('');
        setProductDesc('');
        setRefCategoryCode(24);

        navigate(-1);
    };

    const onChangeHandler = (e) => {
        // form state 업데이트 로직을 추가하십시오.
        const { name, value } = e.target;
        switch (name) {
            case 'productName':
                setProductName(value);
                break;
            case 'productDescription':
                setProductDesc(value);
                break;
            case 'refCategoryCode':
                setRefCategoryCode(value);
                break;
            case 'wishPlaceTrade':
                setWishPlaceTrade(value);
                break;
            // 나머지 form state 업데이트 로직 추가
            default:
                break;
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
            <div className='addDiv'>
                <h2 className='addproduct'>상품등록</h2>
                <hr />
                <div>
                    <div className='productCount'>
                        <label htmlFor="product_name" id="product_name" className="font_all">
                            상품명*
                        </label>
                        {productName !== null && (
                            <div>({productName.length}/50)</div>
                        )}
                        <input
                            type="text"
                            name="productName"
                            id="product_name"
                            className="input_box"
                            placeholder="제목을 입력해 주세요"
                            required
                            maxLength={50}
                            value={productName}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <br />
                    <div className="count_flex">
                        <label htmlFor="image_upload" >
                            이미지 첨부*
                        </label>
                        <div>{`(${imageCount}/${MAX_IMAGES})`}</div>
                        <div className="image-upload-container">
                            <div className='img-flex'>
                                <label className="custom_file_upload">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        name="image_upload[]"
                                        id="image_upload"
                                        multiple
                                        required
                                        onChange={(event) => handleImageUpload(event)}
                                    />
                                    +
                                </label>
                                <div className="image-preview">
                                    {images.map((image, index) => (
                                        <div key={index} className="image-preview-item">
                                            <img
                                                key={`image-${index}`}
                                                src={URL.createObjectURL(image)}
                                                alt={`Uploaded Image ${index}`}
                                                style={{ width: '180px', height: '180px' }}
                                            />
                                            <button

                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='CategoryBox'>
                        <label htmlFor="ref_category" id="ref_category" className="font_all">
                            카테고리 *
                        </label>
                        <select
                            name="ref_category_code"
                            id="ref_category_code"
                            className="category_box"
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

                </div>
                <hr />
                <div>
                    <div className="sell_h1">
                        <label className='price'>가격 설정 *</label>
                        <div className='radiobtn'>
                            <label className='custom-radio' style={{ backgroundColor: priceOption === 'sell' ? '#222222' : '#C7C6C6' }}>
                                <input
                                    type="radio"
                                    id='select'
                                    name="price_option"
                                    value="sell"
                                    required
                                    checked={priceOption === 'sell'} // 추가된 부분
                                    onChange={() => handlePriceOptionChange('sell')}
                                    className='input'
                                />
                                판매하기
                            </label>
                            <label className='custom-radio' style={{ backgroundColor: priceOption === 'share' ? '#222222' : '#C7C6C6' }}>
                                <input
                                    type="radio"
                                    id='select2'
                                    name="price_option"
                                    value="share"
                                    required
                                    checked={priceOption === 'share'} // 추가된 부분
                                    onChange={() => handlePriceOptionChange('share')}
                                    className='input'
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
                            className='PriceBox'
                            placeholder={priceOption === 'share' ? '나눔입니다' : '가격을 입력하세요'}
                            disabled={priceOption === 'share'}
                            value={price !== '' ? priceToString(price).replace("원", '') : price}
                            onChange={handlePriceChange}
                        />
                        <h3 className='koreaWon'>원</h3>
                    </div>
                    <span id="priceInfo" style={{ display: priceOption === 'share' ? 'inline' : 'none' }}>
                    </span>
                    <hr />
                </div>
                <div>
                    <div className='product_box'>
                        <div className='descCount'>
                            <h3 htmlFor="product_description" className='product_description'>
                                상품 설명*
                            </h3>
                            <div>({descriptionLength}/{MAX_DESCRIPTION_LENGTH})</div>
                        </div>
                        <div className='dengerFont'>
                            <textarea
                                name="product_description"
                                id="product_description"
                                className='description'
                                placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요. 서로가 믿고 거래할 수 있도록,자세한 정보와 다양한 각도의 상품 사진을 올려주세요.
            * 안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 오일장(주)가 함께 합니다."
                                onChange={handleDescriptionChange}
                                maxLength={300}
                            ></textarea>
                            <p className='danger'>*부적합한 게시글은 사전에 통보 없이 삭제 될 수 있음을 알려드립니다.</p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <div className='place'>
                    <div className='wishCount'>
                        <label htmlFor="wish_place_to_trade" className='placeFont'>
                            거래희망 장소*
                        </label>
                        {wishPlaceTrade !== null && (
                            <div>({wishPlaceTrade.length}/50)</div>
                        )}
                    </div>
                    <textarea
                        name="wishPlaceTrade"
                        id="wish"
                        className='WishPlace'
                        placeholder="위치 작성"
                        onChange={handleWish}
                        maxLength={50}
                    ></textarea>

                    <hr />
                </div>
                <div>
                    <div className='btnAll'>
                        <button className='addbtn' onClick={handleFormSubmit}>등록</button>
                        <button className='canclebtn' onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;