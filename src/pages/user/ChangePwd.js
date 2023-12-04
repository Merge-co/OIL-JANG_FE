import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { callPostPwdAPI } from "../../apis/UserAPICalls";
import ChangePwdCSS from "../../styles/Modal.module.css";
import UserChangePwdCSS from "../../styles/user/UserModal.module.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";

Modal.setAppElement("#root");

function ChangePwd({ isOpen, closeModal, userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    newPwd: "",
    newPwdConfirm: "",
  });

  const onClickHandler = async () => {
    console.log("form pwd : ", form.newPwd);
    console.log("form newPwdComfirm : ", form.newPwdComfirm);

    try {
      if (form.newPwd === "" || form.newPwdConfirm === "") {
        alert("변경할 비밀번호를 입력해주세요.");
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
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
        className={ChangePwdCSS.modalBg}
      >
        <div className={ChangePwdCSS.modal}>
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
                  type="password"
                  name="newPwd"
                  onChange={onChangeHandler}
                  placeholder="영문,숫자,특수문자 포함 8-16자"
                  className={UserLayoutCSS.input_pwd}
                />
              </div>
              <br />
              <div className={UserChangePwdCSS.inputContainer}>
                <label>변경할 비밀번호 확인</label>
                <br />
                <input
                  type="password"
                  placeholder="작성한 비밀번호를 다시 입력해주세요."
                  onChange={onChangeHandler}
                  name="newPwdConfirm"
                  className={UserLayoutCSS.input_pwd}
                />
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
