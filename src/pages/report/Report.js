import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReportAPI } from "../../apis/ReportAPICalls";
import { useParams } from "react-router-dom";

function Report() {


    const dispatch = useDispatch();
    const result = useSelector(state => state.reportReducer);
    const params = useParams();


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
                <tbody>
                    <td>왜 안되냐 ?</td>
                </tbody>
            </table>
        </>
    )
}
export default Report;