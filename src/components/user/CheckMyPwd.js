import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CheckMyPwd({ isOpen, closeModal, userDetail, onPasswordValidated }) {

  const [password, setPassword] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();
  
    const storedEncryptedPassword = userDetail.data.pwd;
    try {
      const isCorrect = bcrypt.compareSync(password, storedEncryptedPassword);

      if (isCorrect) {
        onPasswordValidated(true);
        closeModal();
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