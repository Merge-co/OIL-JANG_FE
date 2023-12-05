import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { callPostPwdAPI } from "../../apis/UserAPICalls";
import ChangePwdCSS from "../../styles/Modal.module.css";
import UserChangePwdCSS from "../../styles/user/UserModal.module.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function ChangePwd({ isOpen, closeModal, userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    newPwd: "",
    newPwdConfirm: "",
  });
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState(false);

  const onClickHandler = async () => {
    console.log("form pwd : ", form.newPwd);
    console.log("form newPwdComfirm : ", form.newPwdComfirm);


    try {
      if (form.newPwd === "" || form.newPwdConfirm === "") {
        alert("변경할 비밀번호를 입력해주세요.");
        return;
      }else if (!isPwdValid) {
        alert("옳바르지않은 비밀번호 형식입니다.");
        return;
      } else if (form.newPwd !== form.newPwdConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        const result = await dispatch(callPostPwdAPI({ userData, form }));
        if (result.status === 200) {
          navigate("/login");
        } else {
          alert("비밀번호 변경에 실패했습니다.");
          return;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    const checkPwd = validatePassword(e.target.value);

    if(!checkPwd){
      setIsPwdValid(false);
    }else{
      setIsPwdValid(true);
    }


  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility);
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
        className={ChangePwdCSS.modalBg}
      >
        <div className={ChangePwdCSS.modal} style={{width:"30%"}}>
          <div className={ChangePwdCSS.modalBox}>
            <button
              onClick={closeModal}
              className={UserChangePwdCSS.modalClose}
            >
              <i>&times;</i>
            </button>
            <h2 className={ChangePwdCSS.modalTitle}>비밀번호 변경</h2>
            <div className={ChangePwdCSS.div}>
              <div className={UserChangePwdCSS.inputContainer}>
                <label>변경할 비밀번호</label>
                <br />
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="newPwd"
                  onChange={onChangeHandler}
                  placeholder="8~16자 영문 대 소문자, 숫자, 특수문자(@$!%*?&)"
                  className={UserLayoutCSS.input_pwd}
                  maxlength="20"
                />
                <button
                      className={UserLayoutCSS.show_btn}
                      onClick={togglePasswordVisibility}
                      style={{height:"40%"}}
                    >
                      {passwordVisibility ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
              </div>
              <br />
              <div className={UserChangePwdCSS.inputContainer}>
                <label>변경할 비밀번호 확인</label>
                <br />
                <input
                  type={passwordConfirmVisibility ? "text" : "password"}
                  placeholder="작성한 비밀번호를 다시 입력해주세요."
                  onChange={onChangeHandler}
                  name="newPwdConfirm"
                  className={UserLayoutCSS.input_pwd}
                  maxlength="20"
                />
                <button
                      className={UserLayoutCSS.show_btn}
                      onClick={togglePasswordConfirmVisibility}
                      style={{height:"40%"}}
                    >
                      {passwordConfirmVisibility ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
              </div>
              <br />
              <button
                className={UserLayoutCSS.signin__btn}
                onClick={onClickHandler}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ChangePwd;
