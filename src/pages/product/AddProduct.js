import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
    callProductDetailAPI
} from '../../apis/SellingAPUCalls';

const AddProduct = () => {
    
    const [imageCount, setImageCount] = useState(0);
    const [priceOption, setPriceOption] = useState('sell');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [refCategoryCode, setRefCategoryCode] = useState(null); // 초기값을 null로 변경

    const [form, setForm] = useState({
        productName: '',
        productPrice: 0,
        productOrderable: '',
        categoryCode: '',
        productStock: 0, 
        productDescription: '',
    });
        // form 데이터 세팅    
        const onChangeHandler = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        };

        

    const regisProduct = useSelector (state => state.productReducer); //리덕스를 끌고 와주는 친구


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
        setPrice(event.target.value);
    };

    const handleImageUpload = (event) => {
        const selectedImages = event.target.files;
        const newImages = [...images];

        if (selectedImages.length + newImages.length > MAX_IMAGES) {
            alert(`더 이상 ${MAX_IMAGES}개 이상의 이미지를 업로드할 수 없습니다.`);
            return;
        }

        for (let i = 0; i < selectedImages.length; i++) {
            if (newImages.length < MAX_IMAGES) {
                newImages.push(selectedImages[i]);
            } else {
                alert(`더 이상 ${MAX_IMAGES}개 이상의 이미지를 업로드할 수 없습니다.`);
                break;
            }
        }

        setImages(newImages);
        updateImageCount(newImages);
    };

    const handleFormSubmit = async () => {
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_description', productDescription || '');
    
        const refCategoryCodeValue = refCategoryCode !== null ? parseInt(refCategoryCode, 10) : 24;
        formData.append('refCategoryCode', refCategoryCodeValue);
        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("categoryCode", form.categoryCode);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);
    
        // 이미지 파일들을 FormData에 추가
        for (let i = 0; i < images.length; i++) {
            formData.append(`imagesFiles`, images[i]);
        }
    
        try {
            const response = await axios.post('http://localhost:8000/products', formData);
    
            if (response.status === 201) {
                console.log('상품이 성공적으로 등록되었습니다.');
                // 상태 초기화
                setImageCount(0);
                setPriceOption('sell');
                setPrice('');
                setImages([]);
                setProductName('');
                setProductDescription('');
                setRefCategoryCode(null); // 기본값 null로 변경
            } else {
                console.error('상품 등록에 실패했습니다.', response.data); // 에러 메시지 출력
            }
        } catch (error) {
            console.error('API 호출 중 오류가 발생했습니다.', error);
        }
    };
    
    
    const handleCancel = () => {
        // 취소 버튼이 클릭되었을 때 수행할 동작을 정의합니다.
        // 예: 입력된 내용 초기화 등
        setImageCount(0);
        setPriceOption('sell');
        setPrice('');
        setImages([]);
        setProductName('');
        setProductDescription('');
        setRefCategoryCode(24);
    };

    return (
        <>
            <div>
                <h3>상품등록</h3>
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
                        placeholder="제목을 입력해 주세요"
                        required
                    />
                    <br />
                    <div className="count_flex">
                        <label htmlFor="image_upload" className="font_all">
                            이미지 첨부*
                        </label>
                        <div className="image-count">{`(${imageCount}/${MAX_IMAGES})`}</div>
                        <div className="image-preview-container">
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="image_upload[]"
                                    id="image_upload"
                                    multiple
                                    required
                                    onChange={handleImageUpload}
                                />
                                +
                            </label>
                            <div>
                                <input
                                    type="number"
                                    name="ref_category_code"
                                    id="ref_category_code"
                                    className="input_box"
                                    placeholder="카테고리 코드를 입력하세요"
                                    value={refCategoryCode}
                                    onChange={(e) => setRefCategoryCode(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="image-preview-container">
                            {images.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <img
                                        className="image-item"
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded Image"
                                    />
                                    <button
                                        className="delete-image"
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="pricing">
                    <div className="sell_h1">
                        <label className="font_all">가격 설정 *</label>
                        <div className="btn_two">
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="price_option"
                                    value="sell"
                                    required
                                    onChange={() => handlePriceOptionChange('sell')}
                                />
                                판매하기
                            </label>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="price_option"
                                    value="share"
                                    required
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
                        placeholder="가격을 입력하세요"
                        disabled={priceOption === 'share'}
                        value={price}
                        onChange={handlePriceChange}
                    />
                    <span id="priceInfo" style={{ display: 'none' }}>
                        나눔입니다
                    </span>
                </div>
                <div className="explanation">
                    <label htmlFor="product_description" className="font_all">
                        상품 설명*
                    </label>
                    <textarea
                        name="product_description"
                        id="product_description"
                        placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요. 서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요.
            * 안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 오일장(주)가 함께 합니다."
                    ></textarea>
                    <br />
                    <p>*부적합한 게시글은 사전에 통보 없이 삭제 될 수 있음을 알려드립니다.</p>
                    <hr />
                </div>
                <div className="location">
                    <label htmlFor="product_description" className="font_all">
                        거래희망 장소*
                    </label>
                    <textarea
                        name="product_description"
                        id="product_description"
                        className="input_box"
                        placeholder="위치 작성"
                    ></textarea>
                    <hr />
                </div>
                <div className="btn_send">
                    <div className="btn_all">
                        <button onClick={handleFormSubmit}>등록</button>
                        <button onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
