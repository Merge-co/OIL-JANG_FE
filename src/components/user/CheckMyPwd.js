import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Modal from "react-modal";
import CheckMyPwdCSS from "../../styles/Modal.module.css";
import UserCheckMyPwdCSS from "../../styles/user/UserModal.module.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function CheckMyPwd({ isOpen, closeModal, userDetail, onPasswordValidated }) {
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();

    const storedEncryptedPassword = userDetail.data.pwd;
    try {
      const isCorrect = bcrypt.compareSync(password, storedEncryptedPassword);

      if (isCorrect) {
        onPasswordValidated(true);
        closeModal();
      }else if(!password){
        alert("비밀번호를 작성해주세요.");
      } 
      
      else {
        alert("옳지않은 비밀번호입니다.");
      }
    } catch (error) {
      // console.error("Error comparing passwords:", error);
      alert("오류가 발생했습니다. 비밀번호를 다시 입력해주세요.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
        className={CheckMyPwdCSS.modalBg}
      >
        <div className={CheckMyPwdCSS.modal} style={{width : "30%"}}>
          <div className={CheckMyPwdCSS.modalBox}>
            <button
              onClick={closeModal}
              className={UserCheckMyPwdCSS.modalClose}
            >
              <i>&times;</i>
            </button>
            <h2 className={CheckMyPwdCSS.modalTitle}>비밀번호 확인</h2>
            <div className={CheckMyPwdCSS.div}>
              <div className={UserCheckMyPwdCSS.inputContainer}>
                <label className={UserCheckMyPwdCSS.passwordLabel}>
                비밀번호
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={UserLayoutCSS.input_pwd}
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
                <br/>
                <button
                  onClick={submitHandler}
                  className={UserLayoutCSS.signin__btn}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CheckMyPwd;
