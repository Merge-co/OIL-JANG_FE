import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportAPI } from "../../apis/ReportAPICalls";
import { useNavigate, useParams } from "react-router-dom";

function ReportManagement() {


    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer);
    const navigate = useNavigate();

    const onClickProcessDetailHandler = (reportNo) => {
        // 처리 상세페이지 이동
        navigate(`/processDetail/${reportNo}`, { replace: true });
    }

    useEffect(
        () => {
            dispatch(callReportAPI({ // 처리 상세 조회
            }))
        },
        []
    );

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>신고번호</th>
                        <th>신고자</th>
                        <th>판매자</th>
                        <th>판매게시글</th>
                        <th>신고분류</th>
                        <th>처리완료여부</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.map((report) => (
                        <tr key={report.reporNo}>
                            <td>{report.reportNo}</td>
                            <td>{report.reportUserNick}</td>
                            <td>판매자 props</td>
                            <td>{report.productCode.productName}</td>
                            <button><td onClick={() => onClickProcessDetailHandler(report.reportNo)}>{report.refReportCategoryNo.reportCategoryCode}</td></button>
                            <td>{report.sellStatusCode.sellStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default ReportManagement;

