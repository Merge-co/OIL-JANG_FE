import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <h1>나는 해더 시작</h1>
            <div><NavLink to="/">HOME</NavLink></div>
            <div>중고상품</div>
            <div><NavLink to="/product/merge">꾸러미</NavLink></div>
            <div>상품등록</div>
            <div>마이페이지 아이콘</div>
            <div>쪽지 아이콘</div>
            <div>로그아웃</div>
            <h1>나는 해더 끝    </h1>
        </>
    );
}

export default Header;