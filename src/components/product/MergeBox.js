import MergeBoxCSS from '../../styles/product/MergeBox.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_CATEGORY_CODE, GET_RESET_FILTER, GET_RESET_MERGE_CATEGERY_ALL, GET_RESET_PRODUCT_CATEGERY } from '../../modules/ProductModule';
import { useDispatch } from 'react-redux';
import { GET_PAGING } from '../../modules/PagingModule';

function MergeBox() {
    
    const [ money, setMoney ] = useState('');
    const [ remain, setRemain ] = useState('0');
    const [ selectedItem, setSelectedItem ] = useState('0');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onChangeHandler = e => {
        setMoney(e.target.value.replace(/[^0-9]/g, ''));
    }

    useEffect(
        () => {
            setMoney(window.localStorage.getItem("burget"));
            setRemain(window.localStorage.getItem("remainMoney"));
        },[]
    );

    const onClickReset = () => {
        let isReset = window.confirm('초기화하시겠습니까?');
        if(isReset) {
            setMoney('');
            setRemain('0');
            setSelectedItem('0');
            navigate(``);
            dispatch({ type: GET_RESET_FILTER, payload: 1});
            dispatch({ type: GET_PAGING, payload: 1});
            dispatch({ type: GET_RESET_PRODUCT_CATEGERY, payload: 1});
            dispatch({ type: GET_RESET_MERGE_CATEGERY_ALL, payload: 1});
            dispatch({ type: GET_CATEGORY_CODE, payload: 0});
            window.localStorage.setItem("burget", '');
            window.localStorage.setItem("remainMoney", 0);
        }
    }

    const onClickSetMoney = () => {
        let remainMoney = priceToString((+money) - (+buyMoney));
        window.localStorage.setItem("burget", +money);
        setRemain(remainMoney);
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            let remainMoney = priceToString((+money) - (+buyMoney));
            window.localStorage.setItem("burget", +money);
            setRemain(remainMoney);
            window.localStorage.setItem("remainMoney", remainMoney);
        }
      }

    let buyMoney = 0;

    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return(
        <>
            <div className={MergeBoxCSS.mergeBox0}>
            <div onClick={() => onClickReset()} className={MergeBoxCSS.resetBox}>
                 <img src="/images/reset.svg" alt=""/> <div className={MergeBoxCSS.resetBtn}>초기화</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div className={MergeBoxCSS.setMoneyTitle}>예산 설정</div><button onClick={() => onClickSetMoney()} className={ButtonCSS.smallBtn2}>설정</button>
                <label>
                    <input className={MergeBoxCSS.setMoney} onChange={onChangeHandler} onKeyPress={handleKeyPress} value={money} placeholder="예산 설정"        />
                </label>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>선택한 품목</div><div className={MergeBoxCSS.selectedItemNum}>{selectedItem}개</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>남은 예산</div><div className={MergeBoxCSS.remainPrice}>{remain}원</div>
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
                        <img src="/images/mergeCancelBtn.svg" height="34px" className={MergeBoxCSS.cancelBtn} alt=""/>
                    </div>
                </div>
            </div>
            <button className={ButtonCSS.largeBtn}>쪽지 보내기</button>
            </div>
        </>
    );
}

export default MergeBox;