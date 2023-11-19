import { useDispatch } from 'react-redux';
import MergeBoxCSS from '../../styles/product/MergeBox.module.css';
import { GET_MERGE_ITEM, priceToString } from '../../modules/ProductModule';
function MergeItemBox({selectedItem}) {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        window.localStorage.removeItem(`product${selectedItem.productCode}`);
        const changeMergeKeys = window.localStorage.getItem("mergeKeys").split(",").filter(mergeKey => mergeKey !== `product${selectedItem.productCode}`);
        window.localStorage.setItem("mergeKeys", changeMergeKeys);
        dispatch({ type: GET_MERGE_ITEM, payload: 1});
    }

    return(
        <>
            <div className={MergeBoxCSS.selectedItemBox}>
                <div className={MergeBoxCSS.selectedTitleBox}>
                    {selectedItem.categoryName}
                </div>
                <div className={MergeBoxCSS.selectedProductInfoBox}>
                    <div className={MergeBoxCSS.selectedProductImg}></div>
                    <div className={MergeBoxCSS.selectedProductInfo}>
                    <div className={MergeBoxCSS.selectedProductTitle}>{selectedItem.productName}</div>
                    <div className={MergeBoxCSS.selcetedProductPrice}>{priceToString(selectedItem.productPrice)}</div>
                    </div>
                    <img onClick={() => onClickHandler()} src="/images/mergeCancelBtn.svg" height="34px" className={MergeBoxCSS.cancelBtn} alt=""/>
                </div>
            </div>
        </>
    );
}
export default MergeItemBox;