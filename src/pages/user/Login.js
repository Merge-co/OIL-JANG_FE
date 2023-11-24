import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { callLoginAPI } from "../../apis/UserAPICalls";
import userReducer, { POST_LOGIN } from "../../modules/UserModule";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { HttpStatusCode } from "axios";
import { Cookies } from "react-cookie";
import { getCookie } from "../../modules/CookieModule";


const cookies = new Cookies();
const COOKIE_NAME = 'accessToken';

function Login() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    userReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state);

  console.log("loginUser", loginUser);
  console.log(
    "useSelector((state) => state.userReducer)",
    useSelector((state) => state)
  );

  const [form, setForm] = useState({
    id: "",
    pwd: "",
  });

  useEffect(() => {
    if (loginUser.status === 200) {
      console.log("[Login] Login SUCCESS {}", loginUser);
      navigate("/", { replace: true });
    }
  }, [loginUser]);

  if (loginUser.length > 0) {
    console.log("[Login] Login is already authenticated by the server");
    return <Navigate to="/" />;
  }

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickJoinHandler = () => {
    navigate("/join", { replace: true });
  };

  const onClickFindIdHandler = () => {
    navigate("/search_id", { replace: true });
  };

  const onClickChangePwdHandler = () => {
    navigate("/change_pwd", { replace: true });
  };

  const onClickLoginHandler = () => {
    dispatch(
      callLoginAPI({
        form: form,
      })
    );

    alert("로그인 완료");
      navigate("/", { replace: true });

    // if (HttpStatusCode === 200) {
    //   alert("로그인 완료");
    //   navigate("/", { replace: true });
    // }
    //alert("존재하지 않은 아이디입니다.");
  };


  const onClickOAuth2LoginHandler = async (provider) => {

    try{
    if(provider === "google"){
      const clientId = '634314389152-hvham3k7rguk6i36b190d2adr0pi2ddb.apps.googleusercontent.com';
      const redirectUri = 'http://localhost:8000/oauth2/login/google/callback';
      const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

       // 백엔드에 Google OAuth 2.0 로그인 요청
       const authUrl  = 
        `http://localhost:8000/oauth2/authorize/google?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`
     
       const oauthWindow = window.open(authUrl, 'oauth2Login', 'width=500,height=600');
      

    }else if(provider === "naver"){
      console.log('naver');
    }
  } catch(error){
    console.error('OAuth2 Login Error:', error.message);
    window.location.href = 'http://localhost:3000';
  }
} 

  return (
    <>
      <div>
        <h1>로그인</h1>
        <div>
          <label>아이디</label>
          <br />
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={onChangeHandler}
          />
          <br />

          <label>비밀번호</label>
          <br />
          <input
            type="password"
            name="pwd"
            placeholder="PWD"
            onChange={onChangeHandler}
          />
          <br />

          <button onClick={onClickLoginHandler}>로그인</button>
        </div>
        <div>
          <button onClick={onClickJoinHandler}>회원가입</button>
          <button onClick={onClickFindIdHandler}>아이디 찾기</button>
          <button onClick={onClickChangePwdHandler}>비밀번호 변경</button>
        </div>
        <div>
        <button onClick={() => onClickOAuth2LoginHandler("google")}>
            <img src="" alt="구글 로고" />
            Google로 로그인
          </button>
          <br />
          <button>
            <img src="" alt="네이버 로고" />
            Naver로 로그인
          </button>
          <br />
          <button>
            <img src="" alt="kakao 로고" />
            Kakao로 로그인
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default Login;
