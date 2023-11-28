import { useSelector } from "react-redux";
import MergeBox from "../../components/product/MergeBox";
import MergeCategory from "../../components/product/MergeCategory";
import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";
import ScheduleCalendar from "../calendar/ScheduleCalendar";

function Merge() {

    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);
    const productList = useSelector(state => state.productListReducer);
   
    const url = new URL(window.location.href);

    return(
        <>
            <div className={MergeLayoutCSS.mergeMain}>
                <div>
                    <ProductCategory type="merge"/>
                    <MergeCategory />
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductFilter/> : ""}
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductList type="merge" /> : !window.localStorage.getItem("mergeGuide") && <img src="/images/siteImage/mergeGuide.svg" alt="꾸러미 가이드"/>}
                </div>
                <MergeBox/>
            </div>
            <ScheduleCalendar/>
        </>
    );
}

export default Merge;