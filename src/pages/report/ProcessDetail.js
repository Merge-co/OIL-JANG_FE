import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportDetailAPI } from "../../apis/ReportAPICalls";
import ModalCSS from '../../styles/Modal.module.css';

function ProcessDetail({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const processDetail = useSelector(state => state.processReducer);
    const process = processDetail.data;

    console.log('[ReportDetailPage] : ', processDetail.data);
    // 모달창 끄기 버튼
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(callReportDetailAPI({ reportNo: reportNo }));
    }, [reportNo]);

    return (
        <>
            {process &&
                <div className={ModalCSS.container}>
                    <button className={ModalCSS.close} onClick={closeModal}>X</button>
                    <div>
                        <div>신고처리</div>
                        <div>No : {process.reportNo}</div>
                        <div>접수일시 : {process.reportDate}</div>
                        <hr />
                        <div>
                            <div>신고분류 : {process.reportCategoryCode}</div>
                            <div>판매게시글 : {process.productCode.productName}</div>
                            <div>처리일시 : {process.processDate}</div>
                            <div>신고처리 결과 : </div>
                            <div>신고사유 </div>
                            <hr />
                            <div>{process.reportComment}</div>
                            <div>신고처리내용 : { process.sellStatusCode.sellStatus} </div>
                            <hr />
                            <div>{process.processComment}</div>
                        </div>
                    </div>
                </div>}
        </>
    );
}
export default ProcessDetail;