import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI, callSearchReportAPI } from "../../apis/ReportAPICalls";
import { useNavigate } from "react-router-dom";
import ProcessDetail from "./ProcessDetail";
import ReportUpdate from './ReportUpdate';
import Button from '../../styles/PagingBar.module.css';


function ProcessManagement() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer.getReports);
    const [selectedReportNo, setSelectedReportNo] = useState(null);
    const [modalComponent, setModalComponent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const resutList = result && result.data.content;
    


    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동
        setSelectedReportNo(reportNo)
        setModalOpen(true)
        setModalComponent(processDistinction === "Y" ? 'ProcessDetail' : 'ReportUpdate');
    }
    const [searchResult, setSearchResult] = useState();


    // 처리 미처리 셋팅
    const [process, setProcess] = useState('');
    console.log('처리 미처리 확인 : ', searchResult);
    console.log('처리 or 미처리 : ',process);

    useEffect(() => {
        if (process === 'Y') {
            setSearchResult(result && resutList && resutList.filter((resutList) => {
                return resutList.processDistinction === 'Y';
            }));
        } else {
            setSearchResult(result && resutList && resutList.filter((resutList) => {
                return resutList.processDistinction === 'N';
            }));
        }
    }, [process, resutList]);

    // Search setting
    const [search, setSearch] = useState('');

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterKeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);
            dispatch(callSearchReportAPI({
            search: search
            }));
        }
    }
    // paging setting 

    const pageInfo = result && result.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];

    if (pageInfo && pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }
    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(callReportManagementAPI({
            currentPage: currentPage
        }));
    }, [currentPage]);

    return (
        <>
            <div>
                <button onClick={() => setProcess('Y')}>처리</button>
                <button onClick={() => setProcess('N')}>미처리</button>
            </div>

            <input
                type="text"
                placeholder="신고자 이름 검색"
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
                    {Array.isArray(process) && Array.isArray(resutList) ? searchResult.map((report) => (
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
                        (Array.isArray(resutList) && resutList.map((report) => (
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
            <div>
                {Array.isArray(resutList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={Button.buttons}>&lt;</button>
                }
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={currentPage === num ? { backgroundColor: '#9b9b9b' } : null}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(resutList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}>
                        &gt;
                    </button>
                }
            </div>
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

