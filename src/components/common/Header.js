import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from "../../apis/UserAPICalls";
import HeaderCSS from '../../styles/Header.module.css';
import { getCookie } from './../../modules/CookieModule';
import { jwtDecode } from "jwt-decode";

function Header() {
  const [ headerChange, setHeaderChange ] = useState(0);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.userReducer
  );

  const Logouthandler = () => {
    dispatch(callLogoutAPI());
    setHeaderChange(1);
  };

  useEffect(
    () => {
      if((getCookie("accessToken") && jwtDecode(getCookie("accessToken")).Role[0].toString().indexOf("ADMIN") !== -1)) {
        setHeaderChange(3);
      } else if(getCookie("accessToken")) {
        setHeaderChange(2);
      } else {
        setHeaderChange(1);
      }
    },[isLoggedIn]
  );

  const isUserLogin = getCookie("accessToken")

  function NotLogIn() {
    return(
      <>
        <div>
          <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/">HOME</NavLink>
        </div>
        <div>
          <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/usedProduct">중고 상품</NavLink>
        </div>
        <div>
          <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/merge">꾸러미</NavLink>
        </div>
        <div><NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to ="/addProduct">상품등록</NavLink></div>
        <div>
          <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to= {getCookie("accessToken") ? "/myInfo" : "/login"}><img src="/images/siteImage/userIcon.svg" alt="마이페이지 아이콘"/></NavLink>
        </div>
        <div>
          <NavLink className={`${({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} ${HeaderCSS.headerMessage}`} style={{ textDecoration: "none" }} to= {(isUserLogin !== null && isUserLogin !== undefined) ? "/messageList" : "/login" }><img src="/images/siteImage/messageIcon.svg" alt="쪽지 이미지"/></NavLink>
        </div>
        {headerChange === 2 ? <LogOut/>:""}
      </>
    );
  }

  function LogOut() {
    return(
      <div>
        <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/" onClick={Logouthandler}>
          <img src="/images/siteImage/logOutIcon.svg" alt="로그아웃 이미지"/>
        </NavLink>
      </div>

    );
  }

  function AdminHeader() {
    return (
      <>
        <div><NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/">HOME</NavLink></div>
        <div><NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/ProcessManagement">신고관리</NavLink></div>        
        <div><NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/inquiry">문의관리</NavLink></div>
        <NavLink className={({isActive}) => isActive? HeaderCSS.headerActive : HeaderCSS.headerNotActive} style={{ textDecoration: "none" }} to="/" onClick={Logouthandler}>
        <img src="/images/siteImage/logOutIcon.svg" alt="로그아웃 이미지"/>
        </NavLink>
      </>
    );
  }
  
  return (
    <>  
      <div className={HeaderCSS.headerLayout}>
        <div>
          <NavLink to="/">
            <img src="/images/siteImage/logo.png" alt="오일장 로고" height={50} className={HeaderCSS.headerLogo} />
          </NavLink>
        </div>
        <div className={HeaderCSS.headerContainter}>
          {headerChange === 3 ? <AdminHeader/> : <NotLogIn/>}
        </div>
      </div>
      <div className={HeaderCSS.headerMargin}></div>
    </>
  );
}

export default Header;
