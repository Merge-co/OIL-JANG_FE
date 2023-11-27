import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI, callSearchReportAPI } from "../../apis/ReportAPICalls";
import ProcessDetail from "./ProcessDetail";
import ReportUpdate from './ReportUpdate';
import PagingBtn from '../../styles/PagingBar.module.css';
import ManagementCSS from '../../styles/report/processManagement.module.css';
function ProcessManagement() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer.getReports);
    const [selectedReportNo, setSelectedReportNo] = useState(null);
    const [modalComponent, setModalComponent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const resutList = result && result.data.content;

    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동
        console.log('모달이 열리지 않는이유 ? : ', modalOpen);
        setSelectedReportNo(reportNo)
        setModalOpen(true)
        setModalComponent(processDistinction === "Y" ? 'ProcessDetail' : 'ReportUpdate');
    }
    const [searchResult, setSearchResult] = useState();
    // 처리 미처리 셋팅
    const [process, setProcess] = useState('');
    useEffect(() => {
        if (process === '처리') {
            const filteredResults = result && resutList && resutList.filter((resutList) => {
                return resutList.processDistinction === '처리';
            });
            setSearchResult(filteredResults);
        } else {
            const filteredResults = result && resutList && resutList.filter((resutList) => {
                return resutList.processDistinction === '미처리';
            });
            setSearchResult(filteredResults);
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
    const onClickSearchHandler = (e) => {
        dispatch(callSearchReportAPI({
            search: search
        }));
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

    // 글자 수 가 5개 이상일때 ... 으로 변경
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    return (
        <>
            <div className={`${ManagementCSS.box1} ${ManagementCSS.contBox}`}>
                <h1>신고관리</h1>
                <hr />
            </div>
            <div className={`${ManagementCSS.box1} ${ManagementCSS.contBox}`}>

                <div className={`${ManagementCSS.reportSearchBox}`}>
                    <div className={`${ManagementCSS.searchBox}`} >
                        <div className={`${ManagementCSS.reportNav}`}>
                            <button onClick={() => setProcess('처리')}>처리</button>
                            <button onClick={() => setProcess('미처리')}>미처리</button>
                        </div>
                    </div>
                    <div className={`${ManagementCSS.searchBox}`} >
                        <input
                            className={`${ManagementCSS.searchInput}`}
                            type="text"
                            placeholder="신고자 이름 검색"
                            value={search}
                            onKeyUp={onEnterKeyHandler}
                            onChange={onSearchChangeHandler}
                        />
                        <button onClick={onClickSearchHandler} value="검색" className={`${ManagementCSS.searchBtn}`} >검색</button>
                    </div>
                </div>

                <table className={`${ManagementCSS.table}`}>
                    <thead>
                        <tr className={`${ManagementCSS.tr}`}>
                            <th >신고번호</th>
                            <th>신고자</th>
                            <th>판매자</th>
                            <th>판매게시글</th>
                            <th>신고분류</th>
                            <th>처리완료여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(process) && Array.isArray(resutList) ? searchResult.map((report) => (
                            <tr key={report.reportNo} className={`${ManagementCSS.reportListHover}`} onClick={() => onClickProcessDetailHandler(report.reportNo, report.processDistinction)} style={{ cursor: 'pointer' }}>
                                <td>{report.reportNo}</td>
                                <td>{truncateText(report.reportUserNick, 5)}</td>
                                <td>{report.nickName}</td>
                                <td>{truncateText(report.productName, 7)}</td>
                                <td>{truncateText(report.reportCategoryCode, 10)}</td>
                                <td>{report.processDistinction}</td>
                            </tr>
                        )) :
                            (Array.isArray(resutList) && resutList.map((report) => (
                                <tr key={report.reportNo} onClick={() =>
                                    onClickProcessDetailHandler(report.reportNo, report.processDistinction)} style={{ cursor: 'pointer' }} className={`${ManagementCSS.reportListHover} `}>
                                    <td>{report.reportNo}</td>
                                    <td>{truncateText(report.reportUserNick, 5)}</td>
                                    <td>{report.nickName}</td>
                                    <td>{truncateText(report.productName, 7)}</td>
                                    <td>{truncateText(report.reportCategoryCode, 10)}</td>
                                    <td>{report.processDistinction}</td>
                                </tr>
                            )))}
                    </tbody>
                </table >
                <div className={PagingBtn.btnDisabled}
                    style={{ background: 'none' }}>
                    {Array.isArray(resutList) &&
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className={PagingBtn.arrowBtn}>&lt;&lt;</button>
                    }
                    <div className={PagingBtn.btnDisabled}>
                        {Array.isArray(resutList) &&
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={PagingBtn.arrowBtn}>&lt;</button>
                        }
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    className={PagingBtn.numBtn}
                                    style={currentPage === num ? { backgroundColor: '#9b9b9b' } : null}
                                >
                                    {num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(resutList) &&
                            <button
                                className={PagingBtn.arrowBtn}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}>
                                &gt;
                            </button>
                        }
                        <div className={PagingBtn.btnDisabled}>
                            {Array.isArray(resutList) &&
                                <button
                                    onClick={() => setCurrentPage(pageInfo.pageEnd)}
                                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                                    className={PagingBtn.arrowBtn}>&gt;&gt;</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                modalComponent === 'ProcessDetail' ? (
                    <ProcessDetail reportNo={selectedReportNo} setModalOpen={setModalOpen} />
                ) : (
                    <ReportUpdate reportNo={selectedReportNo} setModalOpen={setModalOpen}  />
                )
            )
            }
        </>
    )
}
export default ProcessManagement;

