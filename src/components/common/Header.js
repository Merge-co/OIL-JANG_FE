import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from "../../apis/UserAPICalls";
import HeaderCSS from '../../styles/Header.module.css';
import { getCookie } from './../../modules/CookieModule';
import Login from './../../pages/user/Login';
import { jwtDecode } from "jwt-decode";

function Header() {
  const [ headerChange, setHeaderChange ] = useState(0);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state
  );
  console.log("isLoggedIn info", isLoggedIn);

  const Logouthandler = () => {
    dispatch(callLogoutAPI());
    setHeaderChange(1);
  };

  console.log(headerChange);
  
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

  function NotLogIn() {
    return(
      <>
        <div>
          <NavLink to="/">HOME</NavLink>
        </div>
        <div>
          <NavLink to="/usedProduct">중고상품</NavLink>
        </div>
        <div>
          <NavLink to="/merge">꾸러미</NavLink>
        </div>
        <div><NavLink to ="/addProduct">상품등록</NavLink></div>
        <div>
          <NavLink to="/myPage">마이페이지 아이콘</NavLink>
        </div>
        <div>
          <NavLink to ="/messageList"> 쪽지 아이콘</NavLink>
        </div>
        {headerChange === 2 ? <LogOut/>: <LogIn/>}
      </>
    );
  }

  function LogIn() {
    return(
      <div>
        <NavLink to="/login">로그인</NavLink>
      </div>
    );
  }

  function LogOut() {
    return(
      <div>
        <NavLink to="/" onClick={Logouthandler}>
          로그아웃
        </NavLink>
      </div>
    );
  }

  function AdminHeader() {
    return (
      <>
        <div><NavLink to="/">HOME</NavLink></div>
        <div><NavLink to="/reportSelect">신고관리</NavLink></div>
        <div><NavLink to="/report">신고하기</NavLink></div>
        <div><NavLink to="/inquiry">문의관리</NavLink></div>
        <NavLink to="/" onClick={Logouthandler}>
          로그아웃
        </NavLink>
      </>
    );
  }

  return (
    <>  
      <div className={HeaderCSS.HeaderLayout}>
        {headerChange === 3 ? <AdminHeader/> : <NotLogIn/>}
      </div>
      {/* <div>
        <NavLink to="/login">로그인</NavLink>
      </div>
      <div>
        <NavLink to="/" onClick={Logouthandler}>
          로그아웃
        </NavLink>
      </div> */}
      <div>
        <NavLink to="/test">토큰 테스트</NavLink>
      </div>
    </>
  );
}

export default Header;
