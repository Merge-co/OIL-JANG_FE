import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { callLoginAPI } from "../../apis/UserAPICalls";
import { getCookie } from './../../modules/CookieModule';
import UserLayoutCSS from '../../styles/user/UserLayout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();
  console.log('state : ',state);

  
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
   
     if (loginUser.message !== '탈퇴한 회원입니다. 로그인이 불가능합니다.' && isUserLogin) {
      console.log("[Login] Login SUCCESS {}", loginUser);
      if(state) {
        navigate(state.pathname);
      } else {
        navigate(`/`);
      }
    } else if(loginUser.message !== '탈퇴한 회원입니다. 로그인이 불가능합니다.' && isUserLogin){
      navigate("/error", { replace: true });
    }
  }, [loginUser]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickLoginHandler = async() => {
    try {
      await dispatch(callLoginAPI({ form: form }));
  
      
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

  const onKeyPressHandler = (event) => {
  if (event.key === 'Enter') {
    document.getElementById('loginButton').click();
    }
  };

  return (
    <>
      <div className={UserLayoutCSS.container}>
        <div>
        <h3>로그인</h3>
        </div>
        <div>
          <div className={UserLayoutCSS.pwd_show_btn_input}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            className={UserLayoutCSS.input_id}
          />
          </div>
         <div className={UserLayoutCSS.pwd_show_btn_input}>
          <input
            type={passwordVisibility ? "text" : "password"}
            name="pwd"
            placeholder="PWD"
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            className={UserLayoutCSS.input_pwd}
          />
          <button className={UserLayoutCSS.show_btn} onClick={togglePasswordVisibility}>
            {passwordVisibility ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
          </div>
          <br />

          <div className={UserLayoutCSS.login_btn_container}>
          <button id="loginButton" className={UserLayoutCSS.signin__btn}  onClick={onClickLoginHandler}>로그인</button>
          </div>
        </div>
        <div className={UserLayoutCSS.login_btn_container}>
        <div className={UserLayoutCSS.nav_links}>
          <a href="/join">회원가입</a>
          <h5>|</h5>
          <a href="/searchId">아이디 찾기</a>
          <h5>|</h5>
          <a href="/searchPwd">비밀번호 찾기</a>
        </div>
        </div>
        <div className={UserLayoutCSS.text_space}>
        또는
        </div>
        <div className={UserLayoutCSS.social_btn_img}>
        <button className={UserLayoutCSS.social__google_btn} onClick={() => onClickOAuth2LoginHandler("google")}>
            Google 로그인
          </button>
          <img className={UserLayoutCSS.log_img} src="/images/social/google.png" alt="구글 로고" />
          </div>
          <div className={UserLayoutCSS.social_btn_img}>
          <button className={UserLayoutCSS.social__naver_btn} onClick={() => onClickOAuth2LoginHandler("naver")}  >
           Naver 로그인
          </button>
          <img className={UserLayoutCSS.log_img} src="/images/social/naver.png" alt="네이버 로고" />
          </div>
      </div>
    </>
  );
}

export default Login;