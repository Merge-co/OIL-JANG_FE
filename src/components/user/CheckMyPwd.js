import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Modal from "react-modal";
import CheckMyPwdCSS from "../../styles/Modal.module.css";
import UserCheckMyPwdCSS from "../../styles/user/UserModal.module.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";


Modal.setAppElement("#root");

function CheckMyPwd({ isOpen, closeModal, userDetail, onPasswordValidated }) {
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const storedEncryptedPassword = userDetail.data.pwd;
    try {
      const isCorrect = bcrypt.compareSync(password, storedEncryptedPassword);

      if (isCorrect) {
        onPasswordValidated(true);
        closeModal();
      } else {
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      alert("Error comparing passwords. Please try again.");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
        className={CheckMyPwdCSS.modalBg}
      >
        <div className={CheckMyPwdCSS.modal}>
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={UserLayoutCSS.input_pwd}
                />
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
