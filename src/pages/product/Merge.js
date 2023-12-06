import { useSelector } from "react-redux";
import MergeBox from "../../components/product/MergeBox";
import MergeCategory from "../../components/product/MergeCategory";
import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";
import ModalCSS from "../../styles/Modal.module.css";
import { useState } from "react";
import mergeGuide from '../../images/siteImage/mergeGuide.png';

function Merge() {

    const getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);
   
    const url = new URL(window.location.href);
    const [ closeModal, setCloseModal ] = useState(false);

    function MergeGuide() {

        const onClickCloseGuide = () => {
            window.localStorage.setItem("mergeGuide", 1);
            setCloseModal(true);
        }

        return(
            <>
                <div className={`${ModalCSS.div}`}>
                    <div className={`${ModalCSS.modalBg}`}></div>
                    <div className={`${ModalCSS.modal}`}>
                        <button className={`${ModalCSS.modalClose}`} onClick={onClickCloseGuide}><i className="xi-close-thin xi-2x"></i></button>
                        <div className={`${ModalCSS.modalBox}`}>
                            <h4 className={`${ModalCSS.modalTitle}`} style={{userSelect: 'none'}}>꾸러미 가이드</h4>
                            <div className={`${ModalCSS.modalContent}`} style={{userSelect: 'none'}}>
                                <img src={mergeGuide} alt="" width={700}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            <div style={{width: '70%', margin: '0 auto', marginBottom: 50, userSelect: 'none'}}>
                <h1 style={{textAlign: 'left', color: '#222222'}}>꾸러미</h1>
                <hr/>    
            </div>
            <div className={MergeLayoutCSS.mergeMain}>
                <div>
                    <ProductCategory type="merge"/>
                    <MergeCategory />
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductFilter/> : ""}
                    {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductList type="merge" /> : ""}
                    {!window.localStorage.getItem("mergeGuide") && !closeModal && <MergeGuide/>}
                </div>
                <MergeBox/>
            </div>
        </>
    );
}

export default Merge;