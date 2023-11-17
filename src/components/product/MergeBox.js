import MergeBoxCSS from '../../styles/product/MergeBox.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_CATEGORY_CODE, GET_MERGE_ITEM, GET_RESET_FILTER, GET_RESET_MERGE_CATEGERY_ALL, GET_RESET_PRODUCT_CATEGERY, GET_SEARCH_AGAIN } from '../../modules/ProductModule';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PAGING } from '../../modules/PagingModule';
import MergeItemBox from './MergeItemBox';

function MergeBox() {
    
    const [ money, setMoney ] = useState('');
    const [ remain, setRemain ] = useState('0');
    const [ selectedItemCount, setSelectedItemCount ] = useState('0');
    const [ selectedItem, setSelectedItem ] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onChangeHandler = e => {
        setMoney(e.target.value.replace(/[^0-9]/g, ''));
    }

    useEffect(
        () => {
            if(window.localStorage.getItem("burget") == 0) {
                setMoney("");
            } else {
                setMoney(window.localStorage.getItem("burget"));
            }
            setCalcRemain();
            if(window.localStorage.getItem("remainMoneySearch")) {
                window.localStorage.setItem("remainMoneySearch", 0);
            }
        },[]
    );

    function setCalcRemain() {
        let buyMoney = 0;
        if(window.localStorage.getItem("mergeKeys")) {
            window.localStorage.getItem("mergeKeys").split(",").map(
                mergeKey => buyMoney += JSON.parse(window.localStorage.getItem(mergeKey)).productPrice
            );
            window.localStorage.setItem("remainMoney", +window.localStorage.getItem("burget") - buyMoney);
        } else {
            window.localStorage.setItem("remainMoney", +window.localStorage.getItem("burget"));
        }
        setRemain(window.localStorage.getItem("remainMoney"));
    }

    let mergeItems = useSelector(state => state.productReducer.getMergeItem);
    
    useEffect(
        () => {
            dispatch({ type: GET_MERGE_ITEM, payload: 0});
            if(window.localStorage.getItem("mergeKeys")) {
                const mergeKeys = window.localStorage.getItem("mergeKeys").toString().split(",");
                const selectedItems = [];
                mergeKeys.map(
                    selectedItem => selectedItems.push(JSON.parse(window.localStorage.getItem(selectedItem)))
                )
                setSelectedItem(selectedItems);
                setSelectedItemCount(selectedItems.length);
            } else {
                setSelectedItem([]);
                setSelectedItemCount(0);
            }
            setCalcRemain();
        },[mergeItems == 1]
    );

    const onClickReset = () => {
        let isReset = window.confirm('초기화하시겠습니까?');
        if(isReset) {
            window.localStorage.setItem("burget", '0');
            window.localStorage.setItem("remainMoney", 0);
            window.localStorage.setItem("remainMoneySearch", 0);
            if(window.localStorage.getItem("mergeKeys")) {
                window.localStorage.getItem("mergeKeys").split(",").map(
                    mergeKey => window.localStorage.removeItem(mergeKey)
                );
                window.localStorage.removeItem("mergeKeys");
            }
            setMoney('');
            setRemain('0');
            setSelectedItem([]);
            setSelectedItemCount('0');
            navigate(``);
            dispatch({ type: GET_RESET_FILTER, payload: 1});
            dispatch({ type: GET_PAGING, payload: 1});
            dispatch({ type: GET_RESET_PRODUCT_CATEGERY, payload: 1});
            dispatch({ type: GET_RESET_MERGE_CATEGERY_ALL, payload: 1});
            dispatch({ type: GET_CATEGORY_CODE, payload: 0});
        }
    }

    function calcMoney() {
        window.localStorage.setItem("burget", +money);
        let buyMoney = 0;
        if(window.localStorage.getItem("mergeKeys")) {
            window.localStorage.getItem("mergeKeys").split(",").map(
                mergeKey => buyMoney += JSON.parse(window.localStorage.getItem(mergeKey)).productPrice
            );
            window.localStorage.setItem("remainMoney", +money - buyMoney);
        } else {
            window.localStorage.setItem("remainMoney", +money - buyMoney);
        }
        setRemain(+money - buyMoney);
        window.localStorage.setItem("remainMoneySearch", window.localStorage.getItem("remainMoney"));
        dispatch({ type: GET_SEARCH_AGAIN, payload: 1});

        const curURL = new URL(window.location.href);
        curURL.searchParams.set('page', 1);
        navigate(`${curURL.search}`);
        dispatch({ type: GET_PAGING, payload: 1});
    }

    const onClickSetMoney = () => {
        calcMoney();
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            calcMoney();
        }
      }

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
                    <input className={MergeBoxCSS.setMoney} onChange={onChangeHandler} onKeyPress={handleKeyPress} value={money} placeholder="예산 설정"/>
                </label>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>선택한 품목</div><div className={MergeBoxCSS.selectedItemNum}>{selectedItemCount}개</div>
            </div>
            <div className={MergeBoxCSS.mergeBox1}>
                <div>남은 예산</div><div className={MergeBoxCSS.remainPrice}>{priceToString(remain)}원</div>
            </div>
            <div className={MergeBoxCSS.mergeBox2}>
                {selectedItem.length !==0 ? selectedItem.map(selectedItem => 
                    <MergeItemBox selectedItem={selectedItem}/>
                ): ""}
            </div>
            <button className={ButtonCSS.largeBtn}>쪽지 보내기</button>
            </div>
        </>
    );
}

export default MergeBox;