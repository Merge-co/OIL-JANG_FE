import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportDetailAPI } from "../../apis/ReportAPICalls";
import ModalCSS from '../../styles/Modal.module.css';
import ReportCSS from '../../styles/report/Report.module.css'

function ProcessDetail({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const processDetail = useSelector(state => state.processReducer);
    const process = processDetail.data;

    console.log('[ReportDetailPage] : ', processDetail.data);
    // 모달창 끄기 버튼
    const closeModal = () => {
        setModalOpen(false);
    };

    // 날짜 포맷
    const formatDateFromArray = (dateArray) => {
        if(dateArray.length >= 3) {
            const year = dateArray[0];
            const month = String(dateArray[1]).padStart(2, '0');
            const day = String(dateArray[2]).padStart(2, '0');
            return `${year}-${month}-${day}`
        }
    }

    useEffect(() => {
        dispatch(callReportDetailAPI({ reportNo: reportNo }));
    }, [reportNo]);

    return (
        <>
            <div className={`${ModalCSS.modalBg}`}></div>
            {process &&
                <div className={ModalCSS.modal}>
                    <div className={ModalCSS.modalBox}>
                        <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                        <div>
                            <h4 className={ModalCSS.modalTitle} style={{ display: "flex", justifyContent: "space-between" }}>신고처리
                                <div className={ReportCSS.processTitle}>
                                    <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>No: {process.reportNo}</span>
                                    <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>|</span>
                                    <span className={ReportCSS.processTitleDate} style={{ margin: "5px", fontWeight: "normal" }}>접수일자 : {formatDateFromArray(process.reportDate)}</span>
                                </div>
                            </h4>
                            <div>
                                <div style={{ marginBottom: "3%" }}>신고분류 : {process.refReportCategoryNo.reportCategoryCode}</div>
                                <div style={{ marginBottom: "3%" }}>판매게시글 : {process.productCode.productName}</div>
                                <div style={{ marginBottom: "3%" }}>처리일자 : {formatDateFromArray(process.processDate)}</div>
                                <div>신고처리 결과 : {process.sellStatusCode.sellStatus}</div>
                                <div className={ReportCSS.processTitleSub}>신고사유</div>
                                <div>{process.reportComment}</div>
                                <div className={ReportCSS.processTitleSub}>신고처리내용</div>
                                <div>{process.processComment}</div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}
export default ProcessDetail;