import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ResultCSS from "../../styles/Modal.module.css";
import UserResultCSS from "../../styles/user/UserModal.module.css";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";

Modal.setAppElement("#root");

function Result({ isOpen, closeModal, userData }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Password Modal"
        className={ResultCSS.modalBg}
      >
        <div className={ResultCSS.modal}>
          <div className={ResultCSS.modalBox}>
            <button onClick={closeModal} className={UserResultCSS.modalClose}>
              <i>&times;</i>
            </button>
            <h2 className={ResultCSS.modalTitle}>아이디 찾기 결과</h2>
            <div className={ResultCSS.div}>
              <div className={UserResultCSS.inputContainer}>
                <h3>{userData}</h3>
                <br />
                <button
                  className={UserLayoutCSS.signin__btn}
                  onClick={onClickHandler}
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

export default Result;
