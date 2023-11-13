import MergeCategoryCSS from '../../styles/product/MergeCategory.module.css';

function MergeCategory() {
    return(
        <>
            <div className={MergeCategoryCSS.selectedCategories}>
                <div className={MergeCategoryCSS.clickedSelectedCategory}>패딩</div>
                <div className={MergeCategoryCSS.selectedCategory}>점퍼</div>
                <div className={MergeCategoryCSS.selectedCategory}>조끼/베스트</div>
                <div className={MergeCategoryCSS.selectedCategory}>니트/스웨터</div>
                <div className={MergeCategoryCSS.selectedCategory}>후드티/후드집업</div>
            </div>
        </>
    );
}

export default MergeCategory;
