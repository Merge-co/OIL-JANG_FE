import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callLoginAPI } from "../../apis/UserAPICalls";
import { getCookie } from './../../modules/CookieModule';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginUser = useSelector((state) => state.userReducer);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [form, setForm] = useState({
    id: "",
    pwd: "",
  });

  
  
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };


  

  console.log("loginUser", loginUser);
  console.log(
    "useSelector((state) => state.userReducer)",
    useSelector((state) => state)
  );

 

  useEffect(() => {
    const isUserLogin = getCookie("accessToken")
   
     if (loginUser.status === 200) {
      console.log("[Login] Login SUCCESS {}", loginUser);
      navigate("/", { replace: true });
    } else if(isUserLogin){
      navigate("/error", { replace: true });
    }


  }, [loginUser]);

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
    navigate("/searchId", { replace: true });
  };

  const onClickChangePwdHandler =   () => {
    navigate("/searchPwd", { replace: true });
  };

  const onClickLoginHandler = async() => {
    try {
      await dispatch(callLoginAPI({ form: form }));
  
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
    }
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

      const clientId = 'Z3HB6zpnYOQfQxAReRdR';
      const redirectUri = 'http://localhost:8000/oauth2/login/naver/callback';
      const scope = 'name nickname email mobile gender birthyear birthday';


      const authUrl =
        `http://localhost:8000/oauth2/authorize/naver?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;


        const oauthWindow = window.open(authUrl, 'oauth2Login', 'width=500,height=600');

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
            type={passwordVisibility ? "text" : "password"}
            name="pwd"
            placeholder="PWD"
            onChange={onChangeHandler}
          />
          <button onClick={togglePasswordVisibility}>
            {passwordVisibility ? "Hide" : "Show"} Password
          </button>
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
          <button onClick={() => onClickOAuth2LoginHandler("naver")}  >
            <img src="" alt="네이버 로고" />
            Naver로 로그인
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default Login;