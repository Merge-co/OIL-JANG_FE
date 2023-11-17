import { useSelector } from "react-redux";
import MergeBox from "../../components/product/MergeBox";
import MergeCategory from "../../components/product/MergeCategory";
import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";
import { useCookies } from "react-cookie";

function Merge() {

    const [cookies] = useCookies(['accessToken']);
    const token = cookies.accessToken;
    window.localStorage.setItem("userToken", token);

    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);

    return(
        <>
            <div className={MergeLayoutCSS.mergeMain}>
                <ProductCategory type="merge"/>
                <MergeCategory/>
                {getCategoryCode ? <ProductFilter/> : ""}
                {getCategoryCode ? <ProductList type="merge"/> : ""}
                <MergeBox/>
            </div>
        </>
    );
}

export default Merge;