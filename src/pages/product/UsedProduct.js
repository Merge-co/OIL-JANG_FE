import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";

function UsedProduct() {
    return (
        <>
            <div style={{width: '70%', margin: '0 auto', marginBottom: 50}}>
                <h1 style={{textAlign: 'left', color: '#222222'}}>중고 상품</h1>
                <hr/>    
            </div>
            <div className={MergeLayoutCSS.mergeMain} style={{flexDirection: 'column'}}>
                
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                    <div className={MergeLayoutCSS.mergeCategoryFilter}>
                        <ProductCategory type="list"/>
                        <ProductFilter/>
                    </div>
                    <ProductList type="list" />
                    </div>
                    
                </div>
            </div>
        </>  
    );
}

export default UsedProduct;