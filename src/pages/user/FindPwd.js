import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPostIdAPI } from "../../apis/UserAPICalls";
import ChangePwd from "./ChangePwd";


function FindPwd() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        id: "",
        name: "",
        gender: "",
        birthDate: "",
      });

      const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

      const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const onClickHandler = async() => {
        try {
            const result = await dispatch(callPostIdAPI({ form: form }));
            setUserData(result.data);
      
            console.log('userData',userData);
      
            console.log('result.data',result.data);
              if(result.data === null || result.data === undefined || result.data === ""){
                alert("해당 되는 정보가 없습니다.");
                return;
              }else if(form.id !== result.data){
                alert("해당 되는 정보가 없습니다.");
                return;
              }else{
                openModal();
              }
        
          } catch (error) {
            console.error("Login error:", error);
          }

    }

    const onClickBackHandler = () => {
        navigate("/login");
    }

    return (
      <>
        <div>
          <h1>비밀번호 변경</h1>
          <div >
          <label>아이디</label>
          <input type="text"  name="id" onChange={onChangeHandler}/>
          <br />
          <label>이름</label>
          <input type="text"  name="name" onChange={onChangeHandler}/>
          <br />
          <label>성별</label>
          <select name="gender" value={form.gender} onChange={onChangeHandler} required>
              <option value="" disabled hidden="hidden">
                성별
              </option>
              <option value={"남"}>남</option>
              <option value={"여"}>여</option>
            </select>
          <br/>
          <label>생년월일</label>
          <input type="text" name="birthDate" maxLength={8} onChange={onChangeHandler}/>
          <br/>

          <ChangePwd 
              isOpen={isModalOpen}
              closeModal={closeModal}
              userData={userData} 
              />
         
          <button onClick={onClickHandler} >비밀번호 변경</button>
          <button onClick={onClickBackHandler} >뒤로가기</button>
        </div>
        </div>
      </>
    );
  }
  
  export default FindPwd;
  