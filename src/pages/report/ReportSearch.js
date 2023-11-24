import { useNavigate } from "react-router-dom";
import { getCookie } from "../../modules/CookieModule";
import { jwtDecode } from "jwt-decode";

function ReportSearch({ report }) {

    const navigate = useNavigate();

    const decodedToken = jwtDecode(getCookie('accessToken'));
    const seller = decodedToken.nickName;
    const reportList = report.data;


    const onClickReportHandler = (reportNo) => {
    }
    console.log('어떻게 가져와요 ? : ', report)
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
                    {reportList.map((r) =>
                            <tr>
                                <td > {r.reportNo}</td>
                                <td>{r.reportUserNick}</td>
                                <td>{seller}</td>
                                <td>{r.productCode.productName}</td>
                                <td>{r.refReportCategoryNo.reportCategoryCode}</td>
                                <td>{r.processDistinction}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </>


    );
}
export default ReportSearch;