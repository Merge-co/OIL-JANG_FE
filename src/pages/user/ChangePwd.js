import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { callPostPwdAPI } from "../../apis/UserAPICalls";




Modal.setAppElement('#root');


function ChangePwd({ isOpen, closeModal, userData }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    newPwd: "",
    newPwdConfirm: "",
  });

  const onClickHandler = async () => {

    console.log('form pwd : ', form.newPwd);
    console.log('form newPwdComfirm : ', form.newPwdComfirm);

    try {

      if(form.newPwd === "" || form.newPwdConfirm ===""){
        alert("변경할 비밀번호를 입력해주세요.")
        return;
      }else if(form.newPwd !== form.newPwdConfirm){
        
        alert("비밀번호가 일치하지 않습니다.")

        return;
      }else {
        const result = await dispatch(callPostPwdAPI({ userData,form }));
          if(result.status === 200){
            navigate("/login");
          }else{
            alert("비밀번호 변경에 실패했습니다.")
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
      >
      <div >
        <h1>비밀번호 변경</h1>
        <div >
          <label>변경할 비밀번호</label>
          <br />
          <input type="password" name='newPwd' onChange={onChangeHandler} placeholder="영문,숫자,특수문자 포함 8-16자" />
          <br />
          <label>변경할 비밀번호 확인</label>
          <br />
          <input
            type="password"
            placeholder="작성한 비밀번호를 다시 입력해주세요."
            onChange={onChangeHandler}
            name='newPwdConfirm'
          />
          <br />
          <button onClick={onClickHandler}>비밀번호 변경</button>
        </div>
      </div>
      </Modal>
    </>
  );
}

export default ChangePwd;
