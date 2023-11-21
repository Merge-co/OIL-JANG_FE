import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { callSearchReportAPI } from "../../apis/ReportAPICalls";
import ReportManagement from "../report/ReportManagement";
import ReportSearch from "./ReportSearch";

function Search() {
    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const reports = useSelector(state => state.reportReducer);

    const dispatch = useDispatch();
    console.log('여기도 안들어오나 ??')

    useEffect(() => {
        dispatch(callSearchReportAPI({
            search: value
        }));
    }, []
    );

    return (
        <div>
            {
                reports.length > 0 && reports.map((report) => (<ReportSearch key={report.reportNo} report={report} />))
            }
        </div>
    );
}
export default Search;