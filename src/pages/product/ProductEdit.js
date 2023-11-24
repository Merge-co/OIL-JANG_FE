import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { callProductEditAPI } from '../../apis/ProductEditAPICalls';
import ProductList from '../../components/product/ProductList';

function ProductEdit({ productCode }) {
    const [productName, setProductName] = useState('');
    const [productThumbAddr, setProductThumbAddr] = useState([]);
    const [refCategoryCode, setRefCategoryCode] = useState('');
    const [price, setPriceOption] = useState('sell');
    const [productDesc, setProductDesc] = useState('');
    const [wishPlaceTrade, setWishPlaceTrade] = useState('');


    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                console.log("김민범");
                if (productCode) {
                    const response = await axios.get(`http://localhost:8000/products/${productCode}`);
                    const productData = response.data;

                    setProductName(productData.productName);
                    setProductThumbAddr(productData.productThumbAddr);
                    setRefCategoryCode(productData, refCategoryCode);
                    setPriceOption(productData.price);
                    setProductDesc(productData.productDesc);
                    setWishPlaceTrade(productData.wishPlaceTrade);
                    // console.log("강한성");
                    // console.log('API Response:', response.data);
                    // const fetchedProductName = response.data.productName;
                    // setProductName(fetchedProductName);
                }
            } catch (error) {
                console.error('상품 정보를 가져오는 도중 에러 발생: ', error);
            }
        };

        if (productCode) {
            fetchProductInfo();
        }
    }, [productCode]);


    const handleProductUpdate = async () => {
        const updatedFields = {
            // productCode,
            productName,
            productThumbAddr,
            refCategoryCode,
            price,
            productDesc,
            wishPlaceTrade
        };

        try {
            const response = await axios.put(`http://localhost:8000/products/${productCode}`, updatedFields, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });

            console.log('상품 수정 완료:', response.data);
            // 상품 수정 완료 후 필요한 작업 수행
        } catch (error) {
            console.error('상품 수정 중 에러 발생:', error);
        }



        // callProductEditAPI({ productCode, updatedFields });
    };

    return (
        <>
            <div>
                <h3>상품 수정</h3>
                <hr />
                <div>
                    <label htmlFor="product_name" id="product_name" className="font_all">
                        상품명 *
                    </label>
                    <input
                        type="text"
                        name="productName"
                        id="product_name"
                        className="input_box"
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <br />
                </div>
            </div>
        </>
    );
}
export default ProductEdit;