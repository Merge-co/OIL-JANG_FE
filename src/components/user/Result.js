import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

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
      >
        <h1>결과</h1>
        <p>{userData}</p>
        <button onClick={onClickHandler}>확인</button>
      </Modal>
    </>
  );
}

export default Result;
