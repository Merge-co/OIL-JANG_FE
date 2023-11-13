import MergeBoxCSS from '../../styles/product/MergeBox.module.css';
import ButtonCSS from '../../styles/Button.module.css';

function MergeBox() {
    return(
        <>
            <div className={MergeBoxCSS.mergeBox0}>
            <div className={MergeBoxCSS.resetBox}>
                 <img src="image/reset.svg" alt=""/> <div className={MergeBoxCSS.resetBtn}>초기화</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div className={MergeBoxCSS.setMoneyTitle}>예산 설정</div><button className={ButtonCSS.smallBtn2}>설정</button>
                <label>
                <input className={MergeBoxCSS.setMoney} placeholder="예산 설정" dir="rtl"/>
                </label>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>선택한 품목</div><div className={MergeBoxCSS.selectedItemNum}>0개</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>남은 예산</div><div className={MergeBoxCSS.remainPrice}>100,000원</div>
            </div>
            <div className={MergeBoxCSS.mergeBox2}>
                <div className={MergeBoxCSS.selectedItemBox}>
                <div className={MergeBoxCSS.selectedTitleBox}>
                    패딩
                </div>
                <div className={MergeBoxCSS.selectedProductInfoBox}>
                    <div className={MergeBoxCSS.selectedProductImg}></div>
                    <div className={MergeBoxCSS.selectedProductInfo}>
                    <div className={MergeBoxCSS.selectedProductTitle}>좋은 패딩</div>
                    <div className={MergeBoxCSS.selcetedProductPrice}>63,500원</div>
                    </div>
                    <img src="image/mergeCancelBtn.svg" height="34px" className={MergeBoxCSS.cancelBtn} alt=""/>
                </div>
                </div>
            </div>
            <button className={ButtonCSS.largeBtn}>쪽지 보내기</button>
            </div>
        </>
    );
}

export default MergeBox;