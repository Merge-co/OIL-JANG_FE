// import queryString from "query-string";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { callSearchReportAPI } from "../../apis/ReportAPICalls";
// import ReportManagement from "./ProcessManagement";
// import ReportSearch from "./ReportSearch";

// function Search() {
//     const { search } = useLocation();
//     const { value } = queryString.parse(search);

//     const reports = useSelector(state => state.reportReducer.searchReport);

//     console.log('검색 페이지 ',reports);

//     const dispatch = useDispatch();

//     console.log('Search Page :' , search)

//     useEffect(() => {
//         dispatch(callSearchReportAPI({
//             search: value
//         }));
//     }, [dispatch, value]
//     );

//     return (
//         <div>
//             {
//                reports && <ReportSearch report={reports} />
//             }
//         </div>
//     );
// }
// export default Search;