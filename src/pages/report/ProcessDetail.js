import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callReportDetailAPI } from "../../apis/ReportAPICalls";

function ProcessDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const processDetail = useSelector(state => state.reportReducer);
    const process = processDetail.data

    useEffect(
        () => {
            dispatch(callReportDetailAPI({ // 신고처리 상세내역
                reportNo: params.reportNo
            }));
        },
        []
    );
    return (
        <>
            {
                <div>
                    <div>신고처리</div>
                    <div>
                        {processDetail && 
                     <div>No</div> 
                     }
                    </div>
                    <hr />

                </div>
            }
        </>
    );
}
export default ProcessDetail;