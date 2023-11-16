import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportAPI } from "../../apis/ReportAPICalls";
import { useParams } from "react-router-dom";

function ReportManagement() {


    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer);
    console.log('못받아 ??',result);
    useEffect(
        () => {
            dispatch(callReportAPI());
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
                {result.map(report => (
                    <tbody>
                    <td>{report ? report.reportNo : ''}</td>
                    <td>{report ? report.reportUserNick : ''}</td>
                    <td>{report ? report.reportDate : ''}</td>
                    <td>{report ? report.productCode : ''}</td>
                    <td>{report ? report.reportCategoryCode : ''}</td>
                    <td>{report ? report.refReportCategoryNo : ''}</td>
                </tbody>
                ))}
                <td>{result[0].reportNo}</td>
            </table> 
        </>
    )
}
export default ReportManagement;

