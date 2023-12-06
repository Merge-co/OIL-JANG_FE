import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportManagementAPI } from "../../apis/ReportAPICalls";
import ReportCSS from '../../styles/report/Report.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import PagingBtn from '../../styles/PagingBar.module.css';
import { callSanctionsListAPI, callSanctionsUpdateAPI } from "../../apis/SanctionsAPICalls";
import { current } from "@reduxjs/toolkit";
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

    //현재 날짜
    const currentDate = new Date();
    const isoCurrentDate = currentDate.toISOString();
    // 7일 이후의 날짜 
    const afterSevenDays = new Date();
    afterSevenDays.setDate(currentDate.getDate() + 7);
    const isoAfterSevenDays = afterSevenDays.toISOString();
    // 30일 이후의 날짜
    const afterThirtyDays = new Date();
    afterThirtyDays.setDate(currentDate.getDate() + 30);
    const isoAfterThirtyDays = afterThirtyDays.toISOString();
    // 영구 정지
    const permanentSuspension = new Date();
    permanentSuspension.setDate(currentDate.getFullYear() + 1000);
    const isoPermanentSuspension = permanentSuspension.toISOString();

    const onClickSanctionsUpdateHandler = (refUserCode, count) => {

        const formData = new FormData();
        formData.append("refUserCode", refUserCode);
        formData.append("sanctionsDate", form.sanctionsDate);
        formData.append("managerDate", form.managerDate);

        dispatch(callSanctionsUpdateAPI({
            form: formData
        }));
    }

    const [form, setForm] = useState({
        managerDate: isoCurrentDate,
        sanctionsDate: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
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

    console.log('sanctions...', sanctions)
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
                                    <select
                                        onChange={onChangeHandler}
                                        name="sanctionsDate">
                                        <option disabled selected hidden="hidden">제제기한</option>
                                        <option value={isoAfterSevenDays}>7일</option>
                                        <option value={isoAfterThirtyDays}>30일</option>
                                        <option value={isoPermanentSuspension}>영구정지</option>
                                    </select>
                                </th>
                                <th>
                                    <button
                                        onClick={() => { onClickSanctionsUpdateHandler(sanctions.refUserCode, sanctions.count) }}
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

