import { callJoinAPI } from "../../apis/UserAPICalls";
import React, { useEffect, useState } from "react";
import { POST_LOGIN } from "../../modules/UserModule";
import Certification from"../../components/user/Certification";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Join() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer); 

    const [userData , setUserData] = useState({
      imageFile: null,
        nickname: "",
        id: "",
        pwd: "",
        confirmPwd: "",
        name: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        gender: "",
        email: "",
        agreement: false,
    });

    useEffect(()=>{
      if(user.status === 200 || user.reponse === "ok"){
        console.log("[Join] Join SUCCESS {}",user);
        navigate("/login",{replace : true});
        dispatch({type: POST_LOGIN, payload:''});
      }
    },
    [user]);

    const onChangeHandler = (e) => {

      const name = e.target.name;
      const value = name === 'imageFile' ? e.target.files[0] : e.target.value;
      
      setUserData({
        ...userData,
        [name]: value
      });
      console.log("imageFile onChangeHandler",userData.imageFile);
    };

      const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }

      const onClickJoinHandler = () => {
        dispatch(callJoinAPI({
         userData
        }));
    }


  return(
    <>
      <div>
        <h1>회원 가입</h1>
        <div>
          <div>
            <img src="" alt="" />
            <label>
              <img src="" alt="" />
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={onChangeHandler}
            />
          </div>
          <label>닉네임*</label>
          <div>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              name="nickname"
              onChange={onChangeHandler}
            />
            <button>중복 확인</button>
            <br/>
          </div>
          <label>ID*</label><br/>
          <div>
            <input
              type="text"
              placeholder="ID를 입력하세요."
              name="id"
              onChange={onChangeHandler}
            />
            <button>중복 확인</button>
          </div>
          <br/>
          <label>비밀번호*</label><br/>
          <input
            type="password"
            placeholder="8-16자의 영문, 숫자, 특수문자를 포함한 비밀번호 입력"
            name="pwd"
            onChange={onChangeHandler}
          /><br/>
          <label>비밀번호 확인*</label><br/>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            name="confirmPwd"
            onChange={onChangeHandler}
          /><br/>
          <label>이름*</label><br/>
          <input
            type="text"
            placeholder="이름을 입력하세요."
            name="name"
            onChange={onChangeHandler}
          /><Certification /><br/>
          <label>생년월일*</label><br/>
          <div>
            <input
              type="text"
              id="birthYear"
              placeholder="YYYY"
              name="birthYear"
              onChange={onChangeHandler}
            />
            <span>년</span>
            <select
              id="birthMonth"
              placeholder="Month (MM)"
              name="birthMonth"
              onChange={onChangeHandler}
            >
              <option selected disabled hidden="hidden">월 (MM)</option>
              <option value={"01"}>1월</option>
              <option value={"02"}>2월</option>
              <option value={"03"}>3월</option>
              <option value={"04"}>4월</option>
              <option value={"05"}>5월</option>
              <option value={"06"}>6월</option>
              <option value={"07"}>7월</option>
              <option value={"08"}>8월</option>
              <option value={"09"}>9월</option>
              <option value={"10"}>10월</option>
              <option value={"11"}>11월</option>
              <option value={"12"}>12월</option>
            </select>
            <span>월</span>
            <input
              type="text"
              id="birthDay"
              placeholder="Day (DD)"
              name="birthDay"
              onChange={onChangeHandler}
            />
          </div>
          <label>성별*</label><br/>
          <div>
            <select
              name="gender"
              onChange={onChangeHandler}
            >
              <option selected disabled hidden="hidden">성별</option>
              <option value={"남"} >남성</option>
              <option value={"여"}>여성</option>
            </select>
          </div>
          <br/>
          <label>핸드폰 번호*</label><br/>
          <input
            type="text"
            placeholder="휴대폰번호를 입력하세요."
            name="phone"
            onChange={onChangeHandler}
          /><br/>
          <label>Email<small>(선택사항)</small></label><br/>
          <input
            type="text"
            placeholder="선택 입력"
            name="email"
            onChange={onChangeHandler}
          /><br/>
          <div>
          </div>
          <div>
            <input
              type="checkbox"
              checked
              onChange={onChangeHandler}
            />
            <label>OilJang의 서비스 약관에 동의합니다.</label>
            <a href="">약관 보기</a>
          </div>
          <br/>
          <button onClick={onClickJoinHandler}>회원 가입</button>
          <button onClick={onClickBackHandler}>뒤로 가기</button>
        </div>
      </div>
    </>
  )

}

export default Join;