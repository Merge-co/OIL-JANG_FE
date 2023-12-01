import { callUpdateUserAPI,callGetUserAPI } from "../../apis/UserAPICalls";
import {
  callDuplicatedNicknameAPI,
} from "../../apis/UserAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import ProductDetailCSS from "../../styles/product/ProductDetailCss.module.css";

function EditMyInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const userDetail = user && user.data ? user.data : { data: {} };
  const isPasswordValidated = location.state?.isPasswordValidated || false;

  const [isNicknameUniqueness, setIsNicknameUniqueness] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState(false);
    const [nicknameUniquenessMessage, setNicknameUniquenessMessage] = useState(" ");
    const [realTimePasswordValidation, setRealTimePasswordValidation] =
    useState(" ");
    const [passwordMatchMessage, setPasswordMatchMessage] = useState(" ");
    const [isModified, setIsModified] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isPwdValid, setIsPwdValid] = useState(false);
    const [initialUserData, setInitialUserData] = useState({});


  console.log("user", user);

  console.log("userDetail", userDetail);

  useEffect(() => {
    console.log('Is password validated:', isPasswordValidated);

    if (!isPasswordValidated) {
      navigate("/error");
    }
  }, [isPasswordValidated]);


  const [userData, setUserData] = useState({
    profileImage: null,
    nickname: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  

  const onClickCompleteHandler = () => {


    if (
      !userData.profileImage &&
      !userData.nickname &&
      !userData.newPassword &&
      !userData.newPasswordConfirm
    ) {
      alert("변경된 내용이 없습니다.");
      return;
    }else if (userData.nickname && !isNicknameUniqueness) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }else if (!isPwdValid && userDetail.data.enrollType === 'NORMAL') {
        alert("옳지 않은 형식의 비밀번호입니다.");
        return;
    } else if ((userData.newPassword || userData.newPasswordConfirm) &&
    !isPasswordMatch && userDetail.data.enrollType === 'NORMAL') {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }
    
    const updatedData = {
      profileImage: userData.profileImage,
      nickname: userData.nickname,
      newPassword: userData.newPassword,
      newPasswordConfirm: userData.newPasswordConfirm,
    };

    if (userDetail.data.enrollType !== "NORMAL") {
      delete updatedData.newPassword;
      delete updatedData.newPasswordConfirm;
    }

    console.log("userData.profileImage : ", userData.profileImage);
    console.log("userData.profileImage : ", userData.nickname);
    console.log("userData.profileImage : ", userData.nickname);
    console.log("userData.profileImage : ", userData.newPasswordConfirm);

    console.log("updatedData : ", updatedData);

    dispatch(callUpdateUserAPI({ updatedData }));

    navigate("/myInfo");

    window.location.reload();
   
  };

  useEffect(() => {
    dispatch(callGetUserAPI());
  }, [dispatch]);

  useEffect(() => {
    if (userDetail) {
      const isDataModified =
        userDetail.data &&
        Object.keys(userDetail.data).some(
          (key) => userDetail.data[key] !== initialUserData[key]
        );
  
      if (isDataModified) {
        setInitialUserData({ ...userDetail.data });
      }
    }
  }, [userDetail, initialUserData]);


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = name === "profileImage" ? e.target.files[0] : e.target.value;


    const isFieldModified = initialUserData[name] !== value;

    if (isFieldModified) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }


    if (name === "nickname") {
      const isNicknameValid = validateNickname(value);
      if (!isNicknameValid) {
        setNicknameUniquenessMessage(
          "2~10자 영문 대 소문자, 숫자, 한글을 사용하세요.(공백제외)"
        );
      } else {
        setNicknameUniquenessMessage("");
      }
    }

    if (name === "newPassword") {
      const isPwdValid = validatePassword(value);
      console.log('isPwdValid onchage',isPwdValid);
      if (!isPwdValid && (userData.pwd !== '')) {
        console.log('8~16자 영문 대 소문자, 숫자 특수문자를 사용하세요.');
        setRealTimePasswordValidation(
          "8~16자 영문 대 소문자, 숫자 특수문자를 사용하세요."
        );
        setIsPwdValid(false);
      } else {
        setRealTimePasswordValidation("");
        setIsPwdValid(true);
      }
    }

    if (name === "newPasswordConfirm") {
      console.log('value',value);
      console.log('newPassword',userData.newPassword);
      const doPasswordsMatch = value === userData.newPassword;
      if (!doPasswordsMatch) {
        setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordMatch(false);
      } else {
        setPasswordMatchMessage("");
        setIsPasswordMatch(true);
      }
    }


    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateNickname = (nickname) => {
    const isNicknameValid = /^[a-zA-Z0-9가-힣]{2,10}$/g.test(nickname);
    setIsNicknameValid(isNicknameValid);
    return isNicknameValid;
  };

  const validatePassword = (password) => {
    console.log('validatePassword');
    const isPwdValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%^&*()-_+=]{8,16}$/.test(
        password
      );
      console.log('isPwdValid',isPwdValid);
    return isPwdValid;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility);
  };



  const userImageThumbAddr = userDetail?.data?.userImageThumbAddr?.replace("D:\\OIL-JANG_FE\\public", "") || "";


console.log("userDetail:", userDetail);
console.log("userDetail.data:", userDetail.data);
console.log("userImageThumbAddr:", userImageThumbAddr);

const userImageThumbAddr2 =
  userDetail?.data?.userImageThumbAddr?.replace("D:/OIL-JANG_FE/public", "") || "";
console.log("userImageThumbAddr2 : ", userImageThumbAddr2);
console.log("userImageThumbAddr2 : ", userImageThumbAddr2);

  const onClickBackHandler = () => {
    
    alert("취소 하시겠습니까?")

    navigate("/myInfo", { replace: true })
}


const checkNicknameUniqueness = async (nickname) => {
  if (nickname === null || nickname === "") {
    return false;
  } else {
    try {
      const response = await dispatch(callDuplicatedNicknameAPI(nickname));

      console.log("Full Nickname Uniqueness Response:", response);

      if (response && response.data) {
        const responseData = response.data;
        const message = responseData.message;

        if (message === "중복된 닉네임입니다.") {
          setNicknameUniquenessMessage("중복된 닉네임입니다.");
          return false;
        } else {
          setNicknameUniquenessMessage("사용 가능한 닉네임입니다.");
          setIsNicknameUniqueness(true);
          return true;
        }
      } else {
        console.error("Invalid response structure:", response);
        setNicknameUniquenessMessage("Error checking Nickname uniqueness.");
      }
    } catch (error) {
      console.error("Error checking Nickname uniqueness:", error);
      return false;
    } finally {
      setIsNicknameValid(false);
    }
  }
};


  return (
    <>
      {userDetail && userDetail.data && (
        <div>
          <h1>내정보 수정</h1>

          <div className={ProductDetailCSS.sellerInfoBox}>
            <img
              src={userDetail.userImageThumbAddr}
              className={ProductDetailCSS.sellerProfile}
            />
            <div className={ProductDetailCSS.sellerInfo}></div>
          </div>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={onChangeHandler}
          />
          <div>
            <label>닉네임</label>
            <br />
            <input
              type="text"
              placeholder={userDetail.data.nickname}
              onChange={onChangeHandler}
              disabled={isNicknameUniqueness}
              name="nickname"
            />
            <button
              onClick={() =>
                isNicknameValid && checkNicknameUniqueness(userData.nickname)
              }
              disabled={isNicknameUniqueness || !userData.nickname || !isNicknameValid}
            >
              중복 확인
            </button>
            {!isNicknameValid && <h4>{nicknameUniquenessMessage}</h4>}
            <br />
            <label>아이디</label>
            <br />
            <input type="text" placeholder={userDetail.data.id} readOnly />
            <br />
            {userDetail.data.enrollType !== 'GOOGLE' && (
              <>
                <label>변경할 비밀번호</label>
                <br />
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="영문,숫자,특수문자 포함 8-16자"
                  onChange={onChangeHandler}
                  name="newPassword"
                />
                <button onClick={togglePasswordVisibility}>
                  {passwordVisibility ? "Hide" : "Show"} Password
                </button>
                {realTimePasswordValidation && (
                  <h4>{realTimePasswordValidation}</h4>
                )}
                <br />
                <label>변경할 비밀번호 확인</label>
                <br />
                <input
                  type={passwordConfirmVisibility ? "text" : "password"}
                  placeholder="작성한 비밀번호를 다시 입력해주세요."
                  name="newPasswordConfirm"
                  onChange={onChangeHandler}
                />
                <button onClick={togglePasswordConfirmVisibility}>
                  {passwordConfirmVisibility ? "Hide" : "Show"} Password
                </button>
                {passwordMatchMessage && <h4>{passwordMatchMessage}</h4>}
                <br />
              </>
            )}
            <br />
            <label>이름</label>
            <br />
            <input type="text" value={userDetail.data.name} readOnly />
            <br />
            {userDetail.data.enrollType === 'NORMAL' && (
              <>
            <label>생년월일</label>
            <br />
            <input type="text" value={userDetail.data.birthDate} readOnly />
            <br />
            </>
            )}
            <label>이메일 주소</label>
            <br />
            <input type="text" value={userDetail.data.email} readOnly />
            <br />
            {userDetail.data.enrollType === 'NORMAL' && (
              <>
                <label>휴대폰 번호</label>
                <br />
                <input
                  type="text"
                  placeholder={userDetail.data.phone}
                  onChange={onChangeHandler}
                  name="phone"
                />
                <br />
              </>
            )}
            <div>
              <button onClick={onClickCompleteHandler}>완료</button>
              <button onClick={onClickBackHandler}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditMyInfo;
