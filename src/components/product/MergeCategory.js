import { useState } from 'react';
import MergeCategoryCSS from '../../styles/product/MergeCategory.module.css';
import { useSelector } from 'react-redux';

function MergeCategory() {

    const mergeCategory = useSelector(state => state.mergeReducer);

    const [ mergeCategoryBtn, setMergeCategoryBtn ] = useState("");

    const onClickHandler = filterNo => {
        setMergeCategoryBtn(filterNo);
    }

    return(
        <>
            <div className={MergeCategoryCSS.selectedCategories}>
                {mergeCategory.map(
                    category => <div onClick={() => onClickHandler(category.id)} className={mergeCategoryBtn === category.id ? MergeCategoryCSS.clickedSelectedCategory : MergeCategoryCSS.selectedCategory}>{category.categoryName}</div>
                )}
            </div>
        </>
    );
}

export default MergeCategory;
