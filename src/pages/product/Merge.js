import { useSelector } from "react-redux";
import MergeBox from "../../components/product/MergeBox";
import MergeCategory from "../../components/product/MergeCategory";
import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";


function Merge() {

    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);
   
    const url = new URL(window.location.href);

    return(
        <>
            <div style={{width: '70%', margin: '0 auto', marginBottom: 50}}>
                <h3 style={{textAlign: 'left'}}>꾸러미</h3>
                <hr/>    
            </div>
            <div className={MergeLayoutCSS.mergeMain}>
                
                <div>
                    <ProductCategory type="merge"/>
                    <MergeCategory />
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductFilter/> : ""}
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductList type="merge" /> : <img src="/images/siteImage/mergeGuide.png" alt="꾸러미 가이드"/>}
                </div>
                <MergeBox/>
            </div>
        </>
    );
}

export default Merge;