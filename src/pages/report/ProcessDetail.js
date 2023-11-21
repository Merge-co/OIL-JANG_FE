import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callReportDetailAPI } from "../../apis/ReportAPICalls";

function ProcessDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const processDetail = useSelector(state => state.reportReducer);
    const process = processDetail.data;
    console.log('[ReportDetailPage]', processDetail)
    console.log('[ReportDetailPage]22222', process)

    useEffect(
        () => {
            dispatch(callReportDetailAPI({ // 신고처리 상세내역
                reportNo: params.reportNo
            }));
        },
        []
    );
 

    return (
        (process &&
            <div>
                <div>신고처리</div>
                <div>No : {process.reportNo}</div>
                <div>접수일시 : {process.reportDate}</div>
                <hr />
                <div>
                    <div>신고분류 : {process.refReportCategoryNo.reportCategotyCode}</div>
                    <div>판매게시글 : {process.productCode.productName}</div>
                    <div>처리일시 : {process.processDate}</div>
                    <div>신고처리 결과 : {process.sellStatusCode.sellStatus}</div>
                    <div>신고사유 : {process.reportComment}</div>
                    <div>신고처리사유 : {process.processComment}</div>
                </div>
            </div>
        )
    );

}
export default ProcessDetail;