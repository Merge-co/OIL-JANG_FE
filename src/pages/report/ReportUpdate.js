import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../styles/Button.module.css"
import { useEffect, useState } from "react";
import { callReportUpdateAPI, callReportDetailAPI, callProcessedMessageAPI, callCompanionMessageAPI, callProcessingDetailAPI, callReportManagementAPI } from "../../apis/ReportAPICalls";
import ModalCSS from "../../styles/Modal.module.css"
import ReportCSS from "../../styles/report/Report.module.css"
import { callSanctionsRegistAPI } from "../../apis/SanctionsAPICalls";

function ReportUpdate({ reportNo, userCode, setModalOpen }) {

    const dispatch = useDispatch();
    const processList = useSelector(state => state.processReducer.getProcessing);
    const process = processList && processList.data;
    const navigate = useNavigate();

    const closeModal = () => {
        setModalOpen(false);
    }
    useEffect(() => {
        dispatch(callProcessingDetailAPI(reportNo, userCode));
    }, [reportNo, userCode]);

    // 셋팅할 준비
    const [form, setForm] = useState({
        processDistinction: '',
        processComment: '',
        sellStatusCode: 0
    });
    // 날짜 포맷
    const formatDateFromArray = (dateArray) => {
        if (dateArray.length >= 3) {
            const year = dateArray[0];
            const month = String(dateArray[1]).padStart(2, '0');
            const day = String(dateArray[2]).padStart(2, '0');
            return `${year}-${month}-${day}`
        }
    }

    // form setting
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickReportCheckHandler = () => {

        console.log('[ReportUpdate] onClickReportCheckHandler');
        let processComment = "이미 처리완료된 신고내역";
        let sellStatusCode = "3";

        const formData = new FormData();

        formData.append("reportNo", reportNo);
        formData.append("processComment", processComment);
        formData.append("sellStatusCode", sellStatusCode);

        dispatch(callReportUpdateAPI({
            form: formData
        }));
        setModalOpen(false);
        window.location.reload();
    }

    const onClickReportUpdateHandler = (reportCategoryCode, refUserCode, productCode, reportUserCode, count) => {
        console.log('[ReportUpdate] onClickReportUpdateHdandler');

        const formData = new FormData();
        formData.append("reportNo", reportNo);
        formData.append("processComment", form.processComment);
        formData.append("sellStatusCode", form.sellStatusCode);


        if (formData.get('sellStatusCode') === '0') {
            alert('신고처리 카테고리를 선택하세요.');
            return;
        }
        if (formData.get('processComment') === '') {
            alert('신고처리 내용을 입력하세요.')
            return;
        }
        dispatch(callReportUpdateAPI({
            form: formData
        }));

        if (formData.get('sellStatusCode') === "3") {
            onClickProcessingHandler(reportCategoryCode, refUserCode, productCode, count);
        } else if (formData.get('sellStatusCode') === "1") {
            onClickCompanionHandler(reportUserCode, productCode);
        } else {
            console.error("Errer");
        }
        setModalOpen(false);
        window.location.reload();
    }
    //반려처리에 대한 쪽지 발송 
    const onClickCompanionHandler = (reportUserCode, productCode) => {

        let message = '안녕하세요. \n접수해주신 신고는 타당하지 못하여 부적합으로 신고 처리가 반려되었습니다.';

        dispatch(callCompanionMessageAPI({
            message: message,
            reportUserCode: reportUserCode,
            productCode: productCode
        }));
        alert("처리완료. 반려처리 되었습니다.");
    }

    // 신고처리에 대한 쪽지 발송
    const onClickProcessingHandler = (reportCategoryCode, refUserCode, productCode, count) => {
                     
        let message = '';

        if (reportCategoryCode === '광고성 콘텐츠에요') {
            message = '안녕하세요. \n광고성 컨테츠로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '거래금지 품목이에요') {
            message = '안녕하세요. \n광고성 컨테츠로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '가품,이미테이션 제품이에요.') {
            message = '안녕하세요. \n가품, 이미테이션 제품으로 인해 삭제되었습니다.'
        } else if (reportCategoryCode === '사기가 의심돼요') {
            message = '안녕하세요. \n사기글 의심으로 인해 삭제되었습니다.'
        }
        console.log('refUserCode', refUserCode);
        dispatch(callProcessedMessageAPI({
            message: message,
            refUserCode: refUserCode,
            productCode: productCode
        }));
        alert('처리완료. 게시글이 삭제처리 되었습니다.');
        console.log('count', count);
        if (count === 4) {
            // 판매자 게시글이 5번 삭제되었을 경우 
            dispatch(callSanctionsRegistAPI(refUserCode));
            window.confirm(`신고대상자는 5회 신고내역이있습니다. \n사용자제제를 진행하겠습니까?`)
            navigate('/sanctions')
        } else if (count === 9) {
            dispatch(callSanctionsRegistAPI(refUserCode));
            window.confirm(`신고대상자는 10회 신고내역이있습니다. \n사용자제제를 진행하겠습니까?`)
            navigate('/sanctions')
        } else if (count === 14) {
            dispatch(callSanctionsRegistAPI(refUserCode));
            window.confirm(`신고대상자는 15회 신고내역이있습니다. \n사용자제제를 진행하겠습니까?`)
            navigate('/sanctions')
        }
    }

    return (
        <>
            <div className={`${ModalCSS.modalBg}`}></div>
            {Array.isArray(process) && process.map((process) => (
                <div className={ModalCSS.modal}>
                    <div className={`${ModalCSS.modalBox}`}>
                        <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                        <h4 className={ModalCSS.modalTitle} style={{ display: "flex", justifyContent: "space-between" }}>신고처리
                            <div className={ReportCSS.processTitle}>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>No: {process.reportNo}</span>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>|</span>
                                <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>접수일시 : {formatDateFromArray(process.reportDate)}</span>
                            </div>
                        </h4>
                        <div style={{ marginBottom: "3%" }} >신고분류 : {process.reportCategoryCode}</div>
                        <div >신고된게시글 : {process.productName}</div>
                        <div className={ReportCSS.processTitleSub}>신고사유</div>
                        <div style={{ marginBottom: "3%" }}>신고내용 : {process.reportComment}</div>
                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                            <div style={{ display: "flex", marginBottom: "3%" }}>신고처리 내용</div>

                            {process.sellStatusCode === 1 ?
                                <select
                                    name="sellStatusCode"
                                    onChange={onChangeHandler}
                                    style={{ display: "flex" }}
                                    className={ReportCSS.search}>
                                    <option selected disabled hidden="hidden">선택하세요.</option>
                                    <option value={3}>게시글삭제</option>
                                    <option value={1}>반려</option>
                                </select> :
                                ""
                            }
                        </div>
                        {process.sellStatusCode === 1 ?
                            <>
                                <textarea
                                    name="processComment"
                                    placeholder="삭제 사유 또는 반려 사유는 입력하세요."
                                    onChange={onChangeHandler}
                                    style={{ width: '100%', padding: "2%", height: "100px", resize: "none" }}
                                />  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <button
                                        className={Button.smallBtn2}
                                        onClick={() => {
                                            onClickReportUpdateHandler(process.reportCategoryCode, process.userCode, process.productCode, process.reportUserCode, process.count);
                                        }}
                                    >완료</button>
                                </div>
                            </> : <>
                                <textarea
                                    disabled
                                    name="processComment"
                                    placeholder="이미 처리 완료된 신고입니다."
                                    onChange={onChangeHandler}
                                    style={{ width: '100%', padding: "2%", height: "100px", resize: "none" }}
                                />
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <button
                                        className={Button.smallBtn2}
                                        onClick={() => {
                                            onClickReportCheckHandler(process.reportCategoryCode, process.userCode, process.productCode, process.reportUserCode, process.count);
                                        }}
                                    >확인</button>
                                </div>
                            </>}
                    </div>
                </div>
            ))}
        </>
    )
}
export default ReportUpdate;