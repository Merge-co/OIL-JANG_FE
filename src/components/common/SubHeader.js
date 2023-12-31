import { NavLink } from "react-router-dom";
import SubHeaderCSS from '../../styles/SubHeader.module.css';
import { getCookie } from "../../modules/CookieModule";
import { jwtDecode } from "jwt-decode";

function SubHeader() {

    return (
        <>  
            {getCookie("accessToken") && jwtDecode(getCookie("accessToken")).Role[0] !== "ROLE_ADMIN" &&
            <div className={SubHeaderCSS.subHeaderLayout}>
                <div className={SubHeaderCSS.subHeaderContainter}>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myInfo" style={{ textDecoration: "none" }}><div>내 정보</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myproductlist" style={{ textDecoration: "none" }}><div>판매목록</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/wishList" style={{ textDecoration: "none" }}><div>관심목록</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/myCalendar" style={{ textDecoration: "none" }}><div>일정관리</div></NavLink>
                    </div>
                    <div className={SubHeaderCSS.subHeaderItem}>
                        <NavLink className={({isActive}) => isActive || window.location.href.toString().includes("inquiryDetail")? SubHeaderCSS.subHeaderBorderActive : SubHeaderCSS.subHeaderBorder} to="/inquiry" style={{ textDecoration: "none" }}><div>1:1 문의</div></NavLink>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default SubHeader;