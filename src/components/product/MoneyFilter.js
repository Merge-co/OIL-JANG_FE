
import { useEffect, useState } from 'react';
import ProductFilterCSS from '../../styles/product/ProductFilter.module.css'
function MoneyFilter() {

    const [ moneyCriteria, setMoneyCriteria ] = useState({
        minPriceValue: '',
        maxPriceValue: ''
    });

    const { minPriceValue, maxPriceValue } = moneyCriteria;

    const onChangeHandler = e => {
        const changedMoneyValue = {
            ...moneyCriteria,
            [e.target.name]: e.target.value
        };
        setMoneyCriteria(changedMoneyValue);
        window.localStorage.setItem("moneyCriteriaMin", changedMoneyValue.minPriceValue);
        window.localStorage.setItem("moneyCriteriaMax", changedMoneyValue.maxPriceValue);
    }

    useEffect(
        () => {
            window.localStorage.setItem("moneyCriteriaMin", moneyCriteria.minPriceValue);
            window.localStorage.setItem("moneyCriteriaMax", moneyCriteria.maxPriceValue);
        },[]
    );

    return (
        <>
            <label>
                <input type="text" name="minPriceValue" value={minPriceValue} onChange={onChangeHandler} className={ProductFilterCSS.setMoneyFilter} placeholder="최소 가격"/>
            </label>
            <div className={ProductFilterCSS.moneyBetween}>~</div>
            <label>
                <input type="text" name="maxPriceValue" value={maxPriceValue} onChange={onChangeHandler} className={ProductFilterCSS.setMoneyFilter} placeholder="최대 가격"/>
            </label>
        </>
    );
}

export default MoneyFilter;