import { NavLink } from "react-router-dom";

function AdminHeader() {
    return (
        <>
            <h2>나는 관리자 해더 시작</h2>
            <div><NavLink to="/">HOME</NavLink></div>
            <div><NavLink to="/report">신고관리</NavLink></div>
            <div>문의관리</div>
            <div>로그아웃</div>
            <h2>나는 관리자 해더 끝</h2>
        </>
    );
}

export default AdminHeader;