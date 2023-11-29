import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function CheckMyPwd({ isOpen, closeModal, userDetail}) {

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();
  
    const storedEncryptedPassword = userDetail.data.pwd;
    try {
      const isCorrect = bcrypt.compareSync(password, storedEncryptedPassword);

      if (isCorrect) {
        closeModal();
        navigate("/editMyInfo");
      } else {
        alert('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      alert('Error comparing passwords. Please try again.');
    }

  };

    return(
        <>
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Password Modal">
      <div>
        <h2>비밀번호를 입력하세요.</h2>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </Modal>
    </>
    )
    
}

export default CheckMyPwd;