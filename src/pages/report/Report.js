import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { callReportAPI } from "../apis/ReportAPICalls";
import reportReducer from "../../modules/ReportModule";

function Report() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const report = useSelector(state => state.reportReducer);

    useEffect(
        () => {
            dispatch(callReportAPI({ // 신고관리페이지 조회
                reportNo: params.reportNo
            }));
        },
        []
    );

    return (
        <table>
            <tbody>
                <tr>
                    <th>신고번호</th>
                    <td>{report.reportNo || ''}</td>
                </tr>
                <tr>
                    <th>신고자</th>
                    <td>{report.reportUserNick || ''}</td>
                </tr>
                <tr>
                    <th>판매 게시글</th>
                    <td>{report.reportComment || ''}</td>
                </tr>
                <tr>
                    <th>신고 분류</th>
                    <td>{report.reportCategory || ''}</td>
                </tr>
                <tr>
                    <th>처리여부</th>
                    <td>{report.sellStatus || ''}</td>
                </tr>
            </tbody>
        </table>
    );
}
export default Report;