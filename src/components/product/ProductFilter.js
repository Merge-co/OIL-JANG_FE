import ProductFilterCSS from '../../styles/product/ProductFilter.module.css';
import ProductCategoryCSS from '../../styles/product/ProductCategory.module.css';

function ProductFilter() {
    return(
        <>
            <div className={ProductFilterCSS.productFilterContainer}>
                <div className={ProductFilterCSS.productFilter}>
                    <div className={`${ProductFilterCSS.filterName} ${ProductCategoryCSS.cate3Selected}`}>최신순</div>
                    <div className={`${ProductFilterCSS.filterName} ${ProductCategoryCSS.cate3}`}>고가순</div>
                    <div className={`${ProductFilterCSS.filterName} ${ProductCategoryCSS.cate3}`}>저가순</div>
                </div>
            </div>
        </>
    )
}

export default ProductFilter;