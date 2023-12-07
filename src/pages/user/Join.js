import { callJoinAPI } from "../../apis/UserAPICalls";
import {
  callDuplicatedUserIdAPI,
  callDuplicatedNicknameAPI,
} from "../../apis/UserAPICalls";
import React, { useEffect, useState } from "react";
import { POST_LOGIN } from "../../modules/UserModule";
import Certification from "../../components/user/Certification";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import UserJoinCSS from "../../styles/user/UserJoin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faCamera } from "@fortawesome/free-solid-svg-icons";
import Terms from "../../components/user/Terms";

function Join() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [userData, setUserData] = useState({
    imageFile: null,
    nickname: "",
    id: "",
    pwd: "",
    confirmPwd: "",
    name: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [idUniquenessMessage, setIdUniquenessMessage] = useState(" ");
  const [nicknameUniquenessMessage, setNicknameUniquenessMessage] =
    useState(" ");
  const [realTimePasswordValidation, setRealTimePasswordValidation] =
    useState(" ");

  const [passwordMatchMessage, setPasswordMatchMessage] = useState(" ");
  const [birthdateValidationMessage, setBirthdateValidationMessage] =
    useState(" ");
  const [phoneValidationMessage, setPhoneValidationMessage] = useState(" ");
  const [genderValidationMessage, setGenderValidationMessage] = useState(" ");
  const [nameValidationMessage, setNameValidationMessage] = useState(" ");
  const [validationMessage, setValidationMessage] = useState(" ");

  const [isAgreemanetChecked, setIsAgreemanetChecked] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState(false);
  const [isGenderSelected, setIsGenderSelected] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isCertificationCompleted, setIsCertificationCompleted] =
    useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameUniqueness, setIsNicknameUniqueness] = useState(false);
  const [isIdUniqueness, setIsIdUniqueness] = useState(false);
  const [isBirthdateValid, setIsBirthdateValids] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);


  
  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'visible';
    setIsModalOpen(false);
  };


  const [formattedPhone, setFormattedPhone] = useState("");

  const validateUserData = async (userData) => {
    const {
      imageFile,
      nickname,
      id,
      pwd,
      confirmPwd,
      name,
      birthDate,
      gender,
      phone,
    } = userData;

    const isRequiredFieldsFilled =
      imageFile !== null &&
      nickname !== "" &&
      id !== "" &&
      pwd !== "" &&
      confirmPwd !== "" &&
      name !== "" &&
      birthDate !== "" &&
      gender !== "" &&
      phone !== "";

      // console.log('isGenderSelected',isGenderSelected);

    if (!isImageUploaded) {
      setValidationMessage("프로필 이미지를 선택해주세요.");
      const ErrorElement = document.getElementById('profileMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      // console.log("프로필 이미지를 선택해주세요.");
      return false;
    } else if (!nickname) {
      setNicknameUniquenessMessage("닉네임을 입력해주세요.");
      // console.log("닉네임을 입력해주세요.");
      const ErrorElement = document.getElementById('nicknameMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return false;
    } else if (!isNicknameUniqueness) {
      setNicknameUniquenessMessage("닉네임 중복확인을 해주세요.");
      // console.log("닉네임 중복확인을 해주세요.");
      const ErrorElement = document.getElementById('nicknameMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return false;
    } else if (!id) {
      setIdUniquenessMessage("아이디를 입력해주세요.");
      // console.log("아이디를 입력해주세요.");
      const ErrorElement = document.getElementById('idMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return false;
    }else if (!validateId) {
      setIdUniquenessMessage("3~20자 영문 대소문자와 숫자만 사용 가능합니다.");
      // console.log("3~20자 영문 대소문자와 숫자만 사용 가능합니다.");
      const ErrorElement = document.getElementById('idMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return false;
    }else if (!isIdUniqueness) {
      setIdUniquenessMessage("아이디 중복확인을 해주세요.");
      // console.log("아이디 중복확인을 해주세요.");
      const ErrorElement = document.getElementById('idMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!pwd) {
      setRealTimePasswordValidation("8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)");
      // console.log("8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)");
      const ErrorElement = document.getElementById('pwdMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!isPwdValid) {
      setRealTimePasswordValidation("비밀번호를 입력해주세요.");
      // console.log("비밀번호를 입력해주세요.");
      const ErrorElement = document.getElementById('pwdMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!confirmPwd) {
      setPasswordMatchMessage("비밀번호를 입력해주세요.");
      // console.log("비밀번호를 입력해주세요.");
      const ErrorElement = document.getElementById('pwdMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (pwd !== confirmPwd) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      // console.log("비밀번호가 일치하지 않습니다.");
      const ErrorElement = document.getElementById('pwdMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!name) {
      setNameValidationMessage("이름을 입력해주세요.");
      // console.log("이름을 입력해주세요.");
      const ErrorElement = document.getElementById('nameMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!birthDate) {
      setBirthdateValidationMessage("생년월일을 입력해주세요.");
      // console.log("생년월일을 입력해주세요.");
      const ErrorElement = document.getElementById('dateMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!isGenderSelected) {
      setGenderValidationMessage("성별을 선택해주세요.");
      // console.log("성별을 선택해주세요.");
      const ErrorElement = document.getElementById('genderMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    } else if (!phone) {
      setPhoneValidationMessage("핸드폰번호를 입력해주세요.");
      const ErrorElement = document.getElementById('phoneMessage');
      if (ErrorElement) {
        ErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // console.log("핸드폰번호를 입력해주세요.");
    } else if (!isCertificationCompleted) {
      alert("본인 인증이 완료되지 않았습니다. 인증을 완료해주세요.");
      // console.log("본인 인증이 완료되지 않았습니다. 인증을 완료해주세요.");
      
      return false;
    } else if (!isAgreemanetChecked) {
      alert("서비스 약관에 동의해주세요.");
      // console.log("서비스 약관에 동의해주세요.");
      return false;
    } else if (!isRequiredFieldsFilled) {
      alert("모든 필수 항목을 작성해주세요.");
      // console.log("모든 필수 항목을 작성해주세요.");
      return false;
    }

    return true;
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = name === "imageFile" ? e.target.files[0] : e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
    if (name === "imageFile" && value !== null) {
      setIsImageUploaded(true);
    }

    if (name === "pwd") {
      const isPwdValid = validatePassword(value);
      // console.log("isPwdValid onchage", isPwdValid);
      if (!isPwdValid && userData.pwd !== "") {
        // console.log("8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)");
        setRealTimePasswordValidation(
          "8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)"
        );
      } else {
        setIsPwdValid(true);
        setRealTimePasswordValidation("");
      }
    }

    if (name === "confirmPwd") {
      const doPasswordsMatch = value === userData.pwd;
      if (!doPasswordsMatch) {
        setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordMatchMessage("");
      }
    }

    if (name === "nickname") {
      const isNicknameValid = validateNickname(value);
      // console.log('isNicknameValid',isNicknameValid);
      if (!isNicknameValid) {
        setIsNicknameValid(false);
        setNicknameUniquenessMessage(
          "2~10자 영문 대 소문자, 숫자, 한글을 사용하세요.(공백제외)"
        );
      } else {
        setIsNicknameValid(true);
        setNicknameUniquenessMessage("");
      }
    }

    if (name === "id") {
      const isIdValid = validateId(value);
      // console.log('isIdValid',isIdValid);
      setIsIdValid(isIdValid);
      if (!isIdValid) {
        setIdUniquenessMessage(
          "3~20자 영문 대소문자와 숫자만 사용 가능합니다."
        );
      } else {
        setIdUniquenessMessage("");
      }
    }

    if (name === "birthDate") {
      const isBirthdateValid = /^[0-9]{8}$/.test(value);

      if (isBirthdateValid) {
        setBirthdateValidationMessage("날짜형식에 맞지 않습니다.");
      } else {
        setIsBirthdateValids(true);
        setBirthdateValidationMessage("");
      }
    }

    if (name === "birthDate" && value) {
      const year = value.substring(0, 4);
      const month = value.substring(4, 6);
      const day = value.substring(6, 8);
      const date = new Date(`${year}${month}${day}`);
      setSelectedDate(date);
      onChangeBirthdateHandler(date);
    }

    if (name === "gender" && value !== "") {
      // console.log("IsGenderSelected", isGenderSelected);
      setIsGenderSelected(true);
    }

    if (name === "phone" && value.length <= 13) {
      const numericValue = value.replace(/\D/g, "");
      value = numericValue.slice(0, 13);
      setFormattedPhone(value);
    }
  };

  const onClickJoinHandler = () => {
    if (
      validateUserData(userData) &&
      isImageUploaded &&
      isCertificationCompleted &&
      isAgreemanetChecked
    ) {
      dispatch(
        callJoinAPI({
          userData,
        })
      );
      alert("회원가입이 완료되었습니다.")
      navigate("/login", { replace: true });
    } else {

      // console.log("옳바르지않은 내용입니다.");
    }
  };

  const onClickBackHandler = () => {
    navigate("/login", { replace: true });
  };

  const validatePassword = (password) => {
    // console.log("validatePassword");
    const isPwdValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%^&*()-_+=]{8,16}$/.test(
        password
      );
    // console.log("isPwdValid", isPwdValid);
    return isPwdValid;
  };

  const validateNickname = (nickname) => {
    const isNicknameValid = /^[a-zA-Z0-9가-힣]{2,10}(\s*[a-zA-Z0-9가-힣]){0,8}$/.test(nickname);
    // console.log('isNicknameValid',isNicknameValid);
    setIsNicknameValid(isNicknameValid);
    return isNicknameValid;
  };

  const validateId = (id) => {
    const isIdValid = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/.test(id);
    setIsIdValid(isIdValid);
    // console.log('validateId isIdValid',isIdValid);
    return isIdValid;
  };

  const onChangeBirthdateHandler = (date) => {
    setSelectedDate(date);

    if (date !== null && typeof date === "object") {
      const formattedDate = date
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/-/g, "");

      setUserData({
        ...userData,
        birthDate: formattedDate,
      });
    }
  };

  const checkIdUniqueness = async (id) => {
    if (id === null || id === "") {
      return false;
    } else {
      try {
        const response = await dispatch(callDuplicatedUserIdAPI(id));

        // console.log("Full ID Uniqueness Response:", response);

        if (response && response.data) {
          const responseData = response.data;
          const message = responseData.message;

          if (message === "중복된 ID입니다.") {
            setIsIdUniqueness(false);
            setIdUniquenessMessage("중복된 ID입니다.");
            return false;
          } else {
            setIdUniquenessMessage("사용 가능한 아이디입니다.");
            setIsIdUniqueness(true);
            return true;
          }
        } else {
          // console.error("Invalid response structure:", response);
          setIdUniquenessMessage("Error checking ID uniqueness.");
        }
      } catch (error) {
        // console.error("Error checking ID uniqueness:", error);
        return false;
      } finally {
        setIsIdValid(false);
      }
    }
  };

  const checkNicknameUniqueness = async (nickname) => {
    if (nickname === null || nickname === "") {
      return false;
    } else {
      try {
        const response = await dispatch(callDuplicatedNicknameAPI(nickname));

        // console.log("Full Nickname Uniqueness Response:", response);

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
          // console.error("Invalid response structure:", response);
          setNicknameUniquenessMessage("Error checking Nickname uniqueness.");
        }
      } catch (error) {
        // console.error("Error checking Nickname uniqueness:", error);
        return false;
      } finally {
        setIsNicknameValid(false);
      }
    }
  };

  const agreementChangeHandler = () => {
    setIsAgreemanetChecked(!isAgreemanetChecked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility);
  };

  const handleCertificationSuccess = () => {
    setIsCertificationCompleted(true);
  };

  useEffect(() => {
    if (user.status === 200 || user.reponse === "ok") {
      // console.log("[Join] Join SUCCESS {}", user);
      navigate("/login", { replace: true });
      dispatch({ type: POST_LOGIN, payload: "" });
    }
  }, [user.status, user.response]);

  useEffect(() => {
    if (userData.phone) {
      const formatted = userData.phone.replace(/\D/g, ""); // Remove non-numeric characters
      const parts = [
        formatted.slice(0, 3),
        formatted.slice(3, 7),
        formatted.slice(7),
      ];
      setFormattedPhone(parts.filter(Boolean).join("-"));
    }
  }, [userData.phone]);

  return (
    <>
      <div className={UserLayoutCSS.container}>
        <div>
          <h3>회원 가입</h3>
        </div>
        <div>
            <div>
              <label htmlFor="imageFile">프로필 선택*</label>
              <br />
              <div className={UserJoinCSS.imageUploadContainer}>
                <div className={UserJoinCSS.imagePreviewContainer}>
                  {userData.imageFile ? (
                    <img
                      src={URL.createObjectURL(userData.imageFile)}
                      alt="프로필 이미지 미리보기"
                    />
                  ) : (
                    <span>+</span>
                  )}
                </div>
                <label htmlFor="imageFile" className={UserJoinCSS.cameraButton}>
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  onChange={onChangeHandler}
                  style={{ display: "none" }}
                  required
                />
              </div>
            </div>
            <div>{!isImageUploaded && <p id="profileMessage">{validationMessage}</p>}</div>
            <br />
            <label htmlFor="nickname">닉네임*</label>
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type="text"
                placeholder="2~10자 영문 대 소문자, 숫자, 한글을 사용하세요.(공백 제외)"
                id="nickname"
                name="nickname"
                onChange={onChangeHandler}
                disabled={isNicknameUniqueness}
                required
                className={UserLayoutCSS.input_pwd}
              />
              <button
                className={UserJoinCSS.check_btnn}
                onClick={() =>
                  isNicknameValid && checkNicknameUniqueness(userData.nickname)
                }
                disabled={isNicknameUniqueness || !userData.nickname || !isNicknameValid}
              >
                <h5>중복확인</h5>
              </button>
            </div>
            <div id="nicknameMessage">
              {(nicknameUniquenessMessage && nicknameUniquenessMessage !== "사용 가능한 닉네임입니다.") ? <p>{nicknameUniquenessMessage}</p> : <p style={{color:"#00CC00"}}>{nicknameUniquenessMessage}</p>}
            </div>
            <br />
            <label htmlFor="id">ID*</label>
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type="text"
                placeholder="ID를 입력하세요."
                id="id"
                name="id"
                onChange={onChangeHandler}
                disabled={isIdUniqueness}
                required
                className={UserLayoutCSS.input_pwd}
              />
              <button
                className={UserJoinCSS.check_btnn}
                onClick={() => isIdValid && checkIdUniqueness(userData.id)}
                disabled={isIdUniqueness || !userData.id || !isIdValid}
              >
                <h5>중복 확인</h5>
              </button>
            </div>
            <div id="idMessage">
            {(idUniquenessMessage && idUniquenessMessage !== "사용 가능한 아이디입니다.") ? <p>{idUniquenessMessage}</p> : <p style={{color:"#00CC00"}}>{idUniquenessMessage}</p> }
            </div>
            <br/>
            <label htmlFor="pwd">비밀번호*</label>
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type={passwordVisibility ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                id="pwd"
                name="pwd"
                onChange={onChangeHandler}
                required
                className={UserLayoutCSS.input_pwd}
              />
              <button
                className={UserLayoutCSS.show_btn}
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            <div id="pwdMessage">
            {realTimePasswordValidation && <p>{realTimePasswordValidation}</p>}
            </div>
            <br />
            <label htmlFor="confirmPwd">비밀번호 확인*</label>
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type={passwordConfirmVisibility ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요."
                id="confirmPwd"
                name="confirmPwd"
                onChange={onChangeHandler}
                className={UserLayoutCSS.input_pwd}
                required
              />
              <button
                className={UserLayoutCSS.show_btn}
                onClick={togglePasswordConfirmVisibility}
              >
                {passwordConfirmVisibility ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            <div id="idMessage">
              {(passwordMatchMessage || !userData.confirmPwd) && (
                <p>{passwordMatchMessage}</p>
              )}
            </div>
            <br />
            <label htmlFor="name">이름*</label>
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type="text"
                className={UserLayoutCSS.input_pwd}
                placeholder="이름을 입력하세요."
                name="name"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div id="nameMessage">
            {!userData.name && <p>{nameValidationMessage}</p>}
            </div>
            <br />

            <label htmlFor="birthDate" className={UserJoinCSS.birthDateLabel}>
              생년월일*
            </label>
            <br />
            <div className={UserJoinCSS.birthDateContainer}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  onChangeBirthdateHandler(date);
                }}
                dateFormat="yyyyMMdd"
                placeholderText="생년월일을 입력해주세요."
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={70}
                id="birthDate"
                name="birthDate"
                className={UserJoinCSS.datePickerInput}
              />
            </div>
            <div id="dateMessage">
            {(!userData.birthDate) && (
              <p className={UserJoinCSS.datePickerError}>
                {birthdateValidationMessage}
              </p>
            )}
            </div>

            <div className={UserJoinCSS.genderSelectContainer}>
              <label htmlFor="gender" className={UserJoinCSS.genderLabel}>
                성별*
              </label>
              <div>
                <select
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={onChangeHandler}
                  className={UserJoinCSS.genderSelect}
                  required
                >
                  <option value="" disabled hidden="hidden">
                    성별
                  </option>
                  <option value={"남"}>남성</option>
                  <option value={"여"}>여성</option>
                </select>
              </div>
            </div>
            <div id="genderMessage">
            {!isGenderSelected && (
              <p style={{ color: "red" }}>{genderValidationMessage}</p>
            )}
            </div>
            <br />
            <label htmlFor="phone">핸드폰 번호*</label>
            <div className={UserJoinCSS.input_certifecate}>
              <input
                type="text"
                placeholder="휴대폰번호를 입력하세요."
                id="phone"
                name="phone"
                value={formattedPhone}
                onChange={onChangeHandler}
                className={UserLayoutCSS.input_pwd}
                maxLength={13}
                required
              />
                <Certification
                  userData={userData}
                  onCertificationSuccess={handleCertificationSuccess}
                />
            </div>
            <div id="phoneMessage">{!userData.phone && <p>{phoneValidationMessage}</p>}</div>
            <br />
            <label htmlFor="email">
              Email<small>(선택사항)</small>
            </label>
            <br />
            <div className={UserJoinCSS.input_nickname_check_btn}>
              <input
                type="text"
                placeholder="선택 입력"
                id="email"
                name="email"
                className={UserLayoutCSS.input_pwd}
                onChange={onChangeHandler}
              />
            </div>
            <br />
            <div className={UserJoinCSS.agreementContainer}>
              <input
                type="checkbox"
                name="agreement"
                checked={isAgreemanetChecked}
                onChange={agreementChangeHandler}
                className={UserJoinCSS.agreementCheckbox}
              />
              <label className={UserJoinCSS.agreementLabel}>
                오일장 약관에 동의합니다.
                <span
                  className={UserJoinCSS.agreementLink}
                  onClick={openModal}
                >
                  약관보기
                </span>
              </label>
            </div>
            {isModalOpen && (
                      <div className={UserJoinCSS.modalBackground} onClick={closeModal}>

              <div className={UserJoinCSS.modalContainer} onClick={closeModal}>
                <div className={UserJoinCSS.modalContentContainer}>
                  <div
                    className={UserJoinCSS.modalContent}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={UserJoinCSS.modalTitle}>이용약관</div>
                    <span
                      className={UserJoinCSS.closeModal}
                      onClick={closeModal}
                    >
                      &times;
                    </span>
                    <Terms />
                  </div>
                </div>
              </div>
              </div>
            )}
            <br />
            <div className={UserJoinCSS.buttonContainer}>
              <button
                className={UserJoinCSS.joinButton}
                onClick={onClickJoinHandler}
              >
                회원가입
              </button>
              <button
                className={UserJoinCSS.backButton}
                onClick={onClickBackHandler}
              >
                뒤로가기
              </button>
            </div>
          </div>
        
      </div>
    </>
  );
}

export default Join;
