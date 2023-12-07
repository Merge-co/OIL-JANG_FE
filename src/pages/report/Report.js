import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { callReportRegistAPI } from "../../apis/ReportAPICalls";
import ButtonCSS from '../../styles/Button.module.css'
import ModalCSS from '../../styles/Modal.module.css'
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../modules/CookieModule";
import ReportCSS from '../../styles/report/Report.module.css';

function Report({ productCode, sellStatus, productName, setModalOpen }) {
    // nickName -> 판매자 정보 

    // 모달창 끄기 버튼
    const closeModal = () => {
        setModalOpen(false);
    };

    const decodedToken = jwtDecode(getCookie('accessToken'));
    const seller = decodedToken.nickName;
    const sellerCode = decodedToken.userCode;
    console.log('토큰 확인 ', jwtDecode(getCookie("accessToken")));

    // 리덕스를 이용하기 위한 디스 패처 셀렉터 선언
    const dispatch = useDispatch();

    const [reportForm, setReportForm] = useState({
        // reportUserNick: nickName,
        reportUserCode: sellerCode,
        reportUserNick: seller,
        refReportCategoryNo: 0,
        productCode: productCode,
        reportComment: '',
        sellStatusCode: sellStatus
    });

    // form Data Set
    const onChangeHandler = (e) => {
        setReportForm({
            ...reportForm,
            [e.target.name]: e.target.value
        });
    }

    const onClickRegisterHandler = () => {
        console.log('[ReportRegisteration] onClickReportRegisterationHandler')

        const formData = new FormData();

        formData.append('reportUserCode', reportForm.reportUserCode);
        formData.append("reportUserNick", reportForm.reportUserNick);
        formData.append("refReportCategoryNo", reportForm.refReportCategoryNo);
        formData.append("productCode", reportForm.productCode);
        formData.append("reportComment", reportForm.reportComment);
        formData.append("sellStatusCode", reportForm.sellStatusCode);


        if (formData.get('refReportCategoryNo') === '0') {
            console.log('신고 분류를 선택하세요: ', formData.get('refReportCategoryNo'))
            alert('신고 분류를 선택하세요')
            return;
        }

        if (formData.get('reportComment') === '') {
            console.log('신고내용 입력 됐나요 : ', formData.get('reportComment'))
            alert('신고내용을 입력하세요')
            return;
        }

        dispatch(callReportRegistAPI({
            form: formData
        }));
        alert('신고 접수가 완료되었습니다.')
        setModalOpen(false)
    }
    return (
        <>
            <div className={ModalCSS.modalBg}></div>
            <div className={ModalCSS.modal}>
                <div className={ModalCSS.modalBox}>
                    <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                    <h4 className={ModalCSS.modalTitle} style={{ display: "flex", justifyContent: "space-between" }}>신고처리</h4>
                    <div className={ModalCSS.reportBox} >
                        <div className={`${ModalCSS.modalContent}`}>
                            <div style={{ justifyContent: "space-between", right: "auto" }}>

                                <ul style={{ display: "flex", justifyContent: "space-between" }} >
                                    <li>판매게시글</li><span>{productName}</span>
                                </ul>
                                <ul style={{ display: "flex", justifyContent: "space-between" }}>
                                    <li style={{ display: "flex", marginBottom: "6%" }}>신고분류</li>
                                    <select name="refReportCategoryNo" onChange={onChangeHandler} className={ReportCSS.search} style={{ marginBottom: "10px", padding: "5px", width: "40%" }}>
                                        <option disabled hidden="hidden" selected>선택해주세요.</option>
                                        <option value={1}>광고성 컨텐츠에요</option>
                                        <option value={2}>거래 금지 품목이에요</option>
                                        <option value={3}>가품, 이미테이션제품이에요</option>
                                        <option value={4}>사기가의심돼요</option>
                                    </select>
                                </ul>
                                <ul><li>신고사유</li></ul>
                            </div>
                        </div>
                        <textarea
                            className={ReportCSS.textarea}
                            name="reportComment"
                            onChange={onChangeHandler}
                            style={{ width: '100%', padding: "2%", height: "100px" }}
                            placeholder="신고 내용을 직접 작성해주세요. &#13;자세하게 적어주시면 신고처리에 큰 도움이 됩니다." />
                        <div >
                            <button className={`${ButtonCSS.smallBtn2} `} onClick={onClickRegisterHandler}>보내기</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

}
export default Report;