import { NavLink } from "react-router-dom";

function MyPageHeader() {
    return (
        <>  
            <div>
                <NavLink to="/myPage/wishList">내 정보</NavLink>
            </div>
            <div>
                <NavLink to="/myPage/wishList">판매목록</NavLink>
            </div>
            <div>
                 <NavLink to="/myPage/wishList">관심목록</NavLink>
            </div>
            <div>
                 <NavLink to="/myPage/wishList">1:1 문의</NavLink>
            </div>
        </>
    );
}

export default MyPageHeader;