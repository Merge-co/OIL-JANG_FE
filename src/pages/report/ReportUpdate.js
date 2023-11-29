import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../styles/Button.module.css"
import { useEffect, useState } from "react";
import { callReportUpdateAPI, callReportDetailAPI, callProcessedMessageAPI } from "../../apis/ReportAPICalls";
import ModalCSS from "../../styles/Modal.module.css"
import ReportCSS from "../../styles/report/Report.module.css"

function ReportUpdate({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const processList = useSelector(state => state.processReducer);
    const process = processList.data;

    const closeModal = () => {
        setModalOpen(false);
    }
    useEffect(() => {
        dispatch(callReportDetailAPI({ reportNo }));
    }, [reportNo]);

    // 셋팅할 준비
    const [form, setForm] = useState({
        processDistinction: '',
        processComment: '',
        sellStatusCode: 0
    });

    function dateFormat(date, formatLength) {
        return date.length > formatLength ? date.substring(0, formatLength) : date
    }

    // form setting
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickReportUpdateHandler = (reportCategoryCode, refUserCode, productCode, reportUserNick) => {
        console.log('[ReportUpdate] onClickReportUpdateHdandler');

        const formData = new FormData();
        formData.append("reportNo", reportNo);
        formData.append("processComment", form.processComment);
        formData.append("sellStatusCode", form.sellStatusCode);

        if (formData.get('sellStatusCode') === '0') {
            console.log('폼데이터 : ', formData.get('sellStatusCode'))
            alert('처리 카테고리를 선택하세요.');
            return;
        }
        if (formData.get('processComment') === '') {
            alert('신고처리 내용을 입력하세요.')
            return
        }
        dispatch(callReportUpdateAPI({
            form: formData
        }));

        if (formData.get('sellStatusCode') === "3") {
            onClickSendMessageHandler(reportCategoryCode, refUserCode, productCode);
        } else if (formData.get('sellStatusCode') === "4") {
            console.log('일단 여기로 온다')
            onClickCompanionHandler(reportUserNick, productCode);
        } else {
            console.error("Errer");
        }
        setModalOpen(false);
        // window.location.reload();
    }
    //반려처리에 대한 쪽지 발송 

    const onClickCompanionHandler = (reportUserNick, productCode ) => {

        let message = '안녕하세요. \n접수해주신 신고는 신고내용에 부적합으로 신고 처리가 반려되었습니다.';
       
        dispatch(callProcessedMessageAPI ({
            message : message,
            refUserCode :reportUserNick,
            productCode : productCode
        }));
        alert("처리완료 \n 처리 내용 구매자에게 쪽지 전송하였습니다.");
    }

    // 신고처리에 대한 쪽지 발송
    const onClickSendMessageHandler = (reportCategoryCode, refUserCode, productCode) => {

        let message = '';

        if (reportCategoryCode === '광고성 콘텐츠에요') {
            message = '광고성 컨테츠로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '거래금지 품목이에요') {
            message = '광고성 컨테츠로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '가품,이미테이션 제품이에요.') {
            message = '가품, 이미테이션 제품으로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '사기가 의심돼요') {
            message = '사기글 의심으로 인해 삭제되었습니다.'
        }

        dispatch(callProcessedMessageAPI({
            message: message,
            refUserCode: refUserCode,
            productCode: productCode
        }));
        alert("처리완료 \n 처리 내용 판매자에게 쪽지 전송하였습니다.");
    }
    return (
        <>
            <div className={`${ModalCSS.modalBg}`}></div>
            {process && (
                <div className={ModalCSS.modal}>
                    <div className={`${ModalCSS.modalBox}`}>
                        <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                        <h4 className={ModalCSS.modalTitle} style={{ display: "flex", justifyContent: "space-between" }}>신고처리
                            <div className={ReportCSS.processTitle}>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>No: {process.reportNo}</span>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>|</span>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>접수일시 : {dateFormat(process.reportDate, 10)}</span>
                            </div>
                        </h4>
                        <div style={{ marginBottom: "3%" }} >신고분류 : {process.refReportCategoryNo.reportCategoryCode}</div>
                        <div >신고된게시글 : {process.productCode.productName}</div>
                        <div className={ReportCSS.processTitleSub}>신고사유</div>
                        <div style={{ marginBottom: "3%" }}>신고내용 : {process.reportComment}</div>
                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                            <div style={{ display: "flex", marginBottom: "3%" }}>신고처리 내용</div>
                            <select name="sellStatusCode" onChange={onChangeHandler} style={{ display: "flex" }} className={ReportCSS.search}>
                                <option selected disabled hidden="hidden">선택하세요.</option>
                                <option value={3}>게시글삭제</option>
                                <option value={4}>반려</option>
                            </select>
                        </div>
                        <textarea
                            name="processComment"
                            placeholder="삭제 사유 또는 반려 사유는 입력하세요."
                            onChange={onChangeHandler}
                            style={{ width: '100%', padding: "2%", height: "100px", resize: "none" }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                className={Button.smallBtn2}
                                onClick={() => {
                                    onClickReportUpdateHandler(process.refReportCategoryNo.reportCategoryCode, process.productCode.refUserCode, process.productCode.productCode, process.reportUserNick);
                                }}
                            >완료</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ReportUpdate;