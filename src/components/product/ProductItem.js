import ProductItemCSS from '../../styles/product/ProductItem.module.css';
import ProductListCSS from '../../styles/product/ProductList.module.css';
import ButtonCSS from '../../styles/Button.module.css';

function ProductItem(productList) {
    const productElement = productList.productList;
    const type = productList.type;

    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원";
    }

    const onClickHandler = () => {
        const productSerial = "product" + productElement.productCode;
        
        window.localStorage.setItem(productSerial, JSON.stringify(productElement));
        console.log(JSON.parse(window.localStorage.getItem(productSerial)));
        if(!window.localStorage.getItem("mergeKeys")) {
            window.localStorage.setItem("mergeKeys", productSerial);
        } else {
            let mergeKeys = window.localStorage.getItem("mergeKeys").split(",");
            mergeKeys.push(productSerial);
            mergeKeys = Array.from(new Set(mergeKeys));
            window.localStorage.setItem("mergeKeys", mergeKeys);
        }
    }
    
    

    return(
        <>  
            {type === 'merge' ? <div className='mergeItem'>
                <div className={ProductListCSS.productItem}>
                    <div src={productElement.productThumbAddr} className={ProductItemCSS.productThumb} alt=''/>
                    <div className={ProductItemCSS.productDescBox}>
                        <div className={ProductItemCSS.itemBoxTitle}>{productElement.productName}</div>
                        <div className={ProductItemCSS.itemBoxPrice}>{priceToString(productElement.productPrice)}</div>
                        <div className={ProductItemCSS.itemBoxDatetime}>{timeForToday(productElement.enrollDateTime)}</div>
                    </div>
                    {type === 'merge' ? <button onClick={() => onClickHandler()} className={`${ButtonCSS.smallBtn2} ${ProductListCSS.addItem}`}>담기</button>: ""}
                </div>
            </div> : ""}
            
        </>
    );
    /* "smallBtn2 addItem" */
}

export default ProductItem;