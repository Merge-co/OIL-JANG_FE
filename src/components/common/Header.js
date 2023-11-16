import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from "../../apis/UserAPICalls";
import { POST_LOGIN } from "../../modules/UserModule";

function Header() {
  const dispatch = useDispatch();
  //   const isLoggedIn = useSelector(
  //     (state) => state.userReducer.accessToken !== null
  //   );
  //   console.log("isLoggedIn info", isLoggedIn);

  const Logouthandler = () => {
    dispatch(callLogoutAPI());
  };

  return (
    <>
      <h1>나는 해더 시작</h1>
      <div>
        <NavLink to="/">HOME</NavLink>
      </div>
      <div>중고상품</div>
      <div>
        <NavLink to="/merge">꾸러미</NavLink>
      </div>
      <div>상품등록</div>
      <div>마이페이지 아이콘</div>
      <div>쪽지 아이콘</div>
      {/* {isLoggedIn ? (
        <NavLink to="/" onClick={Logouthandler}>
          로그아웃
        </NavLink>
      ) : (
        <div>
          <NavLink to="/login">로그인</NavLink>
        </div>
      )} */}

      <div>
        <NavLink to="/" onClick={Logouthandler}>
          로그아웃
        </NavLink>
      </div>
      <div>
        <NavLink to="/login">로그인</NavLink>
      </div>
      <div>
        <NavLink to="/admin">관리자 헤더 이동</NavLink>
      </div>
      <div>
        <NavLink to="/test">토큰 테스트</NavLink>
      </div>
      <h1>나는 해더 끝 </h1>
    </>
  );
}

export default Header;
