import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI } from "../../apis/ReportAPICalls";
import ProcessDetail from "./ProcessDetail";
import ReportUpdate from './ReportUpdate';
import PagingBtn from '../../styles/PagingBar.module.css';
import ReportCSS from '../../styles/report/Report.module.css';
function ProcessManagement() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer.getReports);
    const [selectedReportNo, setSelectedReportNo] = useState(null);
    const [modalComponent, setModalComponent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const resultList = result && result.data.content;

    


    const onClickProcessDetailHandler = (reportNo, processDistinction) => {
        // 처리 상세페이지 이동
        setSelectedReportNo(reportNo)
        setModalOpen(true)
        setModalComponent(processDistinction === "처리" ? 'ProcessDetail' : 'ReportUpdate');
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


    // 처리 미처리 셋팅
    const [process, setProcess] = useState('');

    const onClickProcessedHandler = (processType) => {
        setProcess(processType);
        dispatch(callReportManagementAPI({
            process: processType
        }));
    }

    // Search setting
    const [search, setSearch] = useState('');
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }
    const onEnterKeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);
            dispatch(callReportManagementAPI({
                search: search
            }));
        }
    }
    const onClickSearchHandler = () => {
        dispatch(callReportManagementAPI({
            search: search
        }));
    }
    useEffect(() => {

    },[result, modalOpen]);

    // 글자 수 가 5개 이상일때 ... 으로 변경
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    console.log('ProcessManagement : ', resultList);

    return (
        <>
            <div className={`${ReportCSS.box1} ${ReportCSS.contBox}`}>
                <h1>신고관리</h1>
                <hr />
            </div>
            <div className={`${ReportCSS.box1} ${ReportCSS.contBox}`}>

                <div className={`${ReportCSS.reportSearchBox}`}>
                    <div className={`${ReportCSS.searchBox}`} >
                        <div className={`${ReportCSS.reportNav}`}>
                            <button style={{ cursor: "pointer" }} onClick={() => { onClickProcessedHandler('처리') }}>처리</button>
                            <span style={{ color: '#9D9D9D' }}> | </span>
                            <button style={{ cursor: "pointer" }} onClick={() => { onClickProcessedHandler('미처리') }}>미처리</button>
                        </div>
                    </div>
                    <div className={`${ReportCSS.searchBox}`} >
                        <input
                            className={`${ReportCSS.searchInput}`}
                            type="text"
                            placeholder="신고자 이름 검색"
                            value={search}
                            onKeyUp={onEnterKeyHandler}
                            onChange={onSearchChangeHandler}
                        />
                        <button onClick={onClickSearchHandler} onChange={onSearchChangeHandler} value={search} className={`${ReportCSS.searchBtn}`} >검색</button>
                    </div>
                </div>

                <table className={`${ReportCSS.table}`}>
                    <thead>
                        <tr className={`${ReportCSS.tr}`}>
                            <th >신고번호</th>
                            <th>신고자</th>
                            <th>판매자</th>
                            <th>판매게시글</th>
                            <th>신고분류</th>
                            <th>처리완료여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (
                                Array.isArray(resultList) && resultList.map((report) => (
                                    <tr key={report.reportNo} onClick={() =>
                                        onClickProcessDetailHandler(report.reportNo, report.processDistinction)} style={{ cursor: 'pointer' }} className={`${ReportCSS.reportListHover} `}>
                                        <td>{report.reportNo}</td>
                                        <td>{truncateText(report.reportUserNick, 5)}</td>
                                        <td>{report.nickName}</td>
                                        <td>{truncateText(report.productName, 7)}</td>
                                        <td>{truncateText(report.reportCategoryCode, 10)}</td>
                                        <td>{report.processDistinction}</td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table >
                <div className={PagingBtn.btnDisabled}
                    style={{ background: 'none' }}>
                    {Array.isArray(resultList) &&
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className={PagingBtn.arrowBtn}>&lt;&lt;</button>
                    }
                    <div className={PagingBtn.btnDisabled}>
                        {Array.isArray(resultList) &&
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
                        {Array.isArray(resultList) &&
                            <button
                                className={PagingBtn.arrowBtn}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}>
                                &gt;
                            </button>
                        }
                        <div className={PagingBtn.btnDisabled}>
                            {Array.isArray(resultList) &&
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
                    <ReportUpdate reportNo={selectedReportNo} setModalOpen={setModalOpen} />
                )
            )
            }
        </>
    )
}
export default ProcessManagement;

