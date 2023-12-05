import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI } from "../../apis/ReportAPICalls";
import ReportCSS from '../../styles/report/Report.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import PagingBtn from '../../styles/PagingBar.module.css';
import { callSanctionsListAPI } from "../../apis/SanctionsAPICalls";
function SanctionsManagement() {

    const dispatch = useDispatch();
    const sanctionsList = useSelector(state => state.sanctionsReducer);
    const sanctions = Array.isArray(sanctionsList.getSanctionsList?.content) ? sanctionsList.getSanctionsList.content : [];

    // paging setting 
    const pageInfo = sanctionsList && sanctionsList.pageInfo;
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    const pageNumber = [];

    if (pageInfo && pageInfo.total > 0) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    const onClickSanctionsUpdateHandler = () => {

        const formData = new FormData();

    }


    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(callSanctionsListAPI({
            currentPage: currentPage
        }));
    }, [currentPage]);

    // 글자 수 가 5개 이상일때 ... 으로 변경
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '***' : text;
    }

    console.log('sanctionsList...', sanctionsList)
    return (
        <>
            <div className={`${ReportCSS.box1} ${ReportCSS.contBox}`}>
                <h1>사용자제재</h1>
                <hr />
            </div>
            <div className={`${ReportCSS.box1} ${ReportCSS.contBox}`}>

                <div style={{ justifyContent: 'flex-end' }} className={`${ReportCSS.reportSearchBox}`}>
                    <div className={`${ReportCSS.searchBox}`} >
                        <input
                            className={`${ReportCSS.searchInput}`}
                            type="text"
                            placeholder="검색"
                        />
                        <button className={`${ReportCSS.searchBtn}`} >검색</button>
                    </div>
                </div>

                <table className={`${ReportCSS.table}`}>
                    <thead>
                        <tr className={`${ReportCSS.tr}`}>
                            <th>사용자</th>
                            <th>제재횟수</th>
                            <th>제재기한</th>
                            <th>완료?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sanctions.map((sanctions) => (
                            <tr key={sanctions.sanctionsCode}>
                                <th>{sanctions.nickName}({truncateText(sanctions.userId, 3)})</th>
                                <th>{sanctions.count}</th>
                                <th>
                                    <select>
                                        <option>7일</option>
                                        <option>30일</option>
                                        <option>영구정지</option>
                                    </select>

                                </th>
                                <th>
                                    <button 
                                    onClick={onClickSanctionsUpdateHandler}
                                    className={ButtonCSS.smallBtn1}>완료</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table >
                {/* 페이징 */}
                {pageNumber.length > 0 && (
                    <div className={PagingBtn.btnDisabled}
                        style={{ background: 'none' }}>
                        {Array.isArray(sanctions) &&
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className={PagingBtn.arrowBtn}>&lt;&lt;</button>
                        }
                        <div className={PagingBtn.btnDisabled}>
                            {Array.isArray(sanctions) &&
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
                            {Array.isArray(sanctions) &&
                                <button
                                    className={PagingBtn.arrowBtn}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}>
                                    &gt;
                                </button>
                            }
                            <div className={PagingBtn.btnDisabled}>
                                {Array.isArray(sanctions) &&
                                    <button
                                        onClick={() => setCurrentPage(pageInfo.pageEnd)}
                                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                                        className={PagingBtn.arrowBtn}>&gt;&gt;</button>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default SanctionsManagement;

