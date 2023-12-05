import { callUpdateUserAPI, callGetUserAPI } from "../../apis/UserAPICalls";
import { callDuplicatedNicknameAPI } from "../../apis/UserAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import UserJoinCSS from "../../styles/user/UserJoin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faCamera } from "@fortawesome/free-solid-svg-icons";

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
  const [nicknameUniquenessMessage, setNicknameUniquenessMessage] =
    useState(" ");
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
    console.log("Is password validated:", isPasswordValidated);

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
      !userData.imageFile &&
      !userData.nickname &&
      !userData.newPassword &&
      !userData.newPasswordConfirm
    ) {
      alert("변경된 내용이 없습니다.");
      return;
    } else if (userData.nickname && !isNicknameUniqueness) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    } 
    
    if (
      userData.newPassword &&
      !isPwdValid &&
      userDetail.data.enrollType === "NORMAL"
    ) {
      alert("옳지 않은 비밀번호 형식입니다.");
      return;
    }else if (
      (userData.newPassword || userData.newPasswordConfirm) &&
      !isPasswordMatch &&
      userDetail.data.enrollType === "NORMAL"
    ) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const updatedData = {
      profileImage: userData.imageFile,
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

    navigate("/myInfo", { replace: true });
    
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
    const value = name === "imageFile" ? e.target.files[0] : e.target.value;
    console.log("name:", name);
    console.log("value:", value);
  
    const isFieldModified = initialUserData[name] !== value;
  
    if (isFieldModified) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  
    if (name === "imageFile") {
      console.log("name:", name);
  
      // 이미지 프리뷰 갱신
      const previewImage = document.getElementById("previewImage");
      if (previewImage) {
        previewImage.src = URL.createObjectURL(value);
        setUserData({
          ...userData,
          [name]: value,
        });
      }
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
      const previewImage = document.getElementById("previewImage");
      if (previewImage) {
        previewImage.src = ""; // 이미지를 지우고 기존 이미지를 보여줄 때는 빈 문자열로 설정
      }
    }
  
    console.log("check image : ", userData.imageFile);
  
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
      console.log("isPwdValid onchage", isPwdValid);
      if (!isPwdValid && userData.newPassword !== "") {
        console.log("8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)");
        setRealTimePasswordValidation(
          "8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)"
        );
        setIsPwdValid(false);
      } else {
        setRealTimePasswordValidation("");
        setIsPwdValid(true);
      }
    }
  
    if (name === "newPasswordConfirm") {
      console.log("value", value);
      console.log("newPassword", userData.newPassword);
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
  
    // 내정보 수정 조건 확인
    const isUpdateAllowed =
      userData.imageFile ||
      userData.nickname ||
      userData.newPassword ||
      userData.newPasswordConfirm;
  
    if (isUpdateAllowed) {
      // 내정보 수정 가능한 경우
      console.log("내정보 수정이 가능합니다.");
    } else {
      // 내정보 수정이 불가능한 경우
      console.log("내정보 수정이 불가능합니다.");
    }
  };

  const validateNickname = (nickname) => {
    const isNicknameValid = /^[a-zA-Z0-9가-힣]{2,10}$/g.test(nickname);
    setIsNicknameValid(isNicknameValid);
    return isNicknameValid;
  };

  const validatePassword = (password) => {
    console.log("validatePassword");
    const isPwdValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%^&*()-_+=]{8,16}$/.test(
        password
      );
    console.log("isPwdValid", isPwdValid);
    return isPwdValid;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility);
  };

  const userImageThumbAddr = userDetail.data && userDetail.data.userImageThumbAddr
  ? userDetail.data.userImageThumbAddr.replace("C:\\OIL-JANG_FE\\public", "")
  : "";
  console.log("userImageThumbAddr", userImageThumbAddr);

  const onClickBackHandler = () => {
    alert("취소 하시겠습니까?");

    navigate("/myInfo", { replace: true });
  };

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
        <div className={UserLayoutCSS.container}>
          <div>
            <h3>내정보 수정</h3>
          </div>

          <div>
            <div>
              <div className={UserJoinCSS.imageUploadContainer}>
                <div className={UserJoinCSS.imagePreviewContainer}>
                  {userData.imageFile && userData.imageFile instanceof File ? (
                    <img
                      src={URL.createObjectURL(userData.imageFile)}
                      alt="프로필 이미지 미리보기"
                    />
                  ) : (
                    <img src={userImageThumbAddr} alt="기존 이미지" />
                  )}
                </div>
                <label htmlFor="imageFile" className={UserJoinCSS.cameraButton}>
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/png, image/jpeg"
                  onChange={onChangeHandler}
                  style={{ display: "none" }}
                  required
                />
              </div>
              <label for="nickname">닉네임*</label>
              <div className={UserJoinCSS.input_nickname_check_btn}>
                <input
                  type="text"
                  placeholder={userDetail.data.nickname}
                  onChange={onChangeHandler}
                  disabled={isNicknameUniqueness}
                  name="nickname"
                  className={UserLayoutCSS.input_pwd}
                />
                <button
                  className={UserJoinCSS.check_btnn}
                  onClick={() =>
                    isNicknameValid &&
                    checkNicknameUniqueness(userData.nickname)
                  }
                  disabled={
                    isNicknameUniqueness ||
                    !userData.nickname ||
                    !isNicknameValid
                  }
                >
                  중복 확인
                </button>
              </div>
              {(!isNicknameValid && nicknameUniquenessMessage !=="사용 가능한 닉네임입니다.")? (<p >{nicknameUniquenessMessage}</p>) : (<p style={{color:"#00CC00"}}>{nicknameUniquenessMessage}</p>) }
              <br />
              <label for="id">아이디</label>
              <div className={UserJoinCSS.input_nickname_check_btn}>
                <br />
                <input
                  type="text"
                  className={UserLayoutCSS.input_phone}
                  placeholder={userDetail.data.id}
                  readOnly
                />
              </div>
              <br />
              {userDetail.data.enrollType !== "GOOGLE" && (
                <>
                  <label>변경할 비밀번호</label>
                  <div className={UserJoinCSS.input_nickname_check_btn}>
                    <input
                      type={passwordVisibility ? "text" : "password"}
                      className={UserLayoutCSS.input_pwd}
                      placeholder="영문,숫자,특수문자 포함 8-16자"
                      onChange={onChangeHandler}
                      name="newPassword"
                    />
                    <button
                      className={UserLayoutCSS.show_btn}
                      onClick={togglePasswordVisibility}
                      style={{height:"70%"}}
                    >
                      {passwordVisibility ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  {realTimePasswordValidation && (
                    <p>{realTimePasswordValidation}</p>
                  )}
                  <br />
                  <label>변경할 비밀번호 확인</label>
                  <div className={UserJoinCSS.input_nickname_check_btn}>
                    <input
                      type={passwordConfirmVisibility ? "text" : "password"}
                      className={UserLayoutCSS.input_pwd}
                      placeholder="작성한 비밀번호를 다시 입력해주세요."
                      name="newPasswordConfirm"
                      onChange={onChangeHandler}
                    />
                    <button
                      className={UserLayoutCSS.show_btn}
                      onClick={togglePasswordConfirmVisibility}
                    >
                      {passwordVisibility ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  {passwordMatchMessage && <p>{passwordMatchMessage}</p>}
                  <br />
                </>
              )}
              <label>이름</label>
              <div className={UserJoinCSS.input_nickname_check_btn}>
                <input
                  type="text"
                  value={userDetail.data.name}
                  className={UserLayoutCSS.input_pwd}
                  readOnly
                />
              </div>
              <br />
              {userDetail.data.enrollType === "NORMAL" && (
                <>
                  <label>생년월일</label>
                  <div className={UserJoinCSS.input_nickname_check_btn}>
                    <input
                      type="text"
                      value={userDetail.data.birthDate}
                      className={UserLayoutCSS.input_pwd}
                      readOnly
                    />
                  </div>
                  <br />
                </>
              )}
              <label>이메일 주소</label>
              <div className={UserJoinCSS.input_nickname_check_btn}>
                <input
                  type="text"
                  value={userDetail.data.email}
                  className={UserLayoutCSS.input_pwd}
                  readOnly
                />
              </div>
              <br />
              {userDetail.data.enrollType === "NORMAL" && (
                <>
                  <label>휴대폰 번호</label>
                  <div className={UserJoinCSS.input_nickname_check_btn}>
                    <input
                      type="text"
                      placeholder={userDetail.data.phone}
                      className={UserLayoutCSS.input_phone}
                      onChange={onChangeHandler}
                      name="phone"
                      readOnly
                    />
                  </div>
                </>
              )}
              <div className={UserJoinCSS.buttonContainer}>
                <button
                  className={UserJoinCSS.joinButton}
                  onClick={onClickCompleteHandler}
                >
                  완료
                </button>
                <button
                  className={UserJoinCSS.backButton}
                  onClick={onClickBackHandler}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditMyInfo;
