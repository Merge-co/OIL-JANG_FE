import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI, callSearchReportAPI } from "../../apis/ReportAPICalls";
import { useNavigate } from "react-router-dom";
import ProcessDetail from "./ProcessDetail";
import ReportUpdate from './ReportUpdate';


function ProcessManagement() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer.getReports);
    const [selectedReportNo, setSelectedReportNo] = useState(null);
    const [modalComponent, setModalComponent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동
        setSelectedReportNo(reportNo)
        setModalOpen(true)
        setModalComponent(processDistinction === "Y" ? 'ProcessDetail' : 'ReportUpdate');
    }
    const [searchResult, setSearchResult] = useState();


    // 상태값 설정
    const [process, setProcess] = useState('');
    

    useEffect(() => {
        if (process === 'Y') {
            setSearchResult(result && result.filter((result) => {
                return result.processDistinction === 'Y';
            }));
        } else {
            setSearchResult(result && result.filter((result) => {
                return result.processDistinction === 'N';
            }));
        }
    }, [process]);

    // Search setting
    const [search, setSearch] = useState('');

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterKeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);

            navigate(`/search?value=${search}`, { replace: false });
            // dispatch(callSearchReportAPI({
            // search: search
            // }));
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
            <div>
                <button onClick={() => setProcess('Y')}>처리</button>
                <button onClick={() => setProcess('N')}>미처리</button>
            </div>

            <input
                type="text"
                placeholder="검색"
                value={search}
                onKeyUp={onEnterKeyHandler}
                onChange={onSearchChangeHandler}
            />
            <h1>신고관리</h1>
            <hr />
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
                    {process ? searchResult.map((report) => (
                        <tr key={report.reportNo}>
                            <td>
                                <button onClick={() =>
                                    onClickProcessDetailHandler(report.reportNo, report.processDistinction)}>
                                    {report.reportNo}
                                </button>
                            </td>
                            <td>{report.reportUserNick}</td>
                            <td>{report.nickName}</td>
                            <td>{report.productName}</td>
                            <td>{report.reportCategoryCode}</td>
                            <td>{report.processDistinction}</td>
                        </tr>
                    )) :
                        (result && result.map((report) => (
                            <tr key={report.reportNo}>
                                <td>
                                    <button onClick={() =>
                                        onClickProcessDetailHandler(report.reportNo, report.processDistinction)}>
                                        {report.reportNo}
                                    </button>
                                </td>
                                <td>{report.reportUserNick}</td>
                                <td>{report.nickName}</td>
                                <td>{report.productName}</td>
                                <td>{report.reportCategoryCode}</td>
                                <td>{report.processDistinction}</td>
                            </tr>
                        )))}
                </tbody>
            </table >

            {modalOpen && (
                modalComponent === 'ProcessDetail' ? (
                    <ProcessDetail reportNo={selectedReportNo} setModalOpen={setModalOpen} />
                ) : (
                    <ReportUpdate reportNo={selectedReportNo} setModalOpen={setModalOpen} />
                )
            )
            }
        </>
    )
}


export default ProcessManagement;

