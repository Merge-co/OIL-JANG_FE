import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI, callSearchReportAPI } from "../../apis/ReportAPICalls";
import { useNavigate, useParams } from "react-router-dom";

function ReportManagement() {


    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer);
    const navigate = useNavigate();
    
    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동

        if (processDistinction !== "N") {
            navigate(`/processDetail/${reportNo}`, { replace: true });
        } else {
            navigate(`/process/${reportNo}`, { repalce: true });
        }
    }

    const [search, setSearch] = useState('');

    // Search setting
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterKeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);

            navigate(`/search?value=${search}`, { replace: false });

            // dispatch(callSearchReportAPI ({
            //     search: search
            // }));

            // window.location.reload();
        }
    }

    useEffect(
        () => {
            dispatch(callReportManagementAPI({ // 처리 상세 조회

            }))
        },
        []
    );

    return (
        <>
        <input type="checkBox" value="Y"/>처리
        <input type="checkBox" value="N"/>미처리
        <input
                    type="text"
                    placeholder="검색"
                    value={search}
                    onKeyUp={onEnterKeyHandler}
                    onChange={onSearchChangeHandler}
                />
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
                            <td >{report.refReportCategoryNo.reportCategoryCode}</td>
                            <button onClick={() => onClickProcessDetailHandler(report.reportNo, report.processDistinction)}>
                                <td>{report.processDistinction}</td>
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default ReportManagement;

