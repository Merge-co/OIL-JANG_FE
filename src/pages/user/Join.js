import { callJoinAPI } from "../../apis/UserAPICalls";
import React, { useState } from "react";
import userReducer, { POST_JOIN } from "../../modules/UserModule";
import Certification from"../../components/user/Certification";
import { CookiesProvider, useCookies  } from 'react-cookie';




function Join() {

    const [userData , setUserData] = useState({
        profile: "",
        nickname: "",
        id: "",
        password: "",
        confirmPassword: "",
        name: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        gender: "",
        email: "",
        agreement: false,
    })

    const [cookies, setCookie] = useCookies(["accessToken"]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      };


      const handleCheckboxChange = () => {
        setUserData({ ...userData, agreement: !userData.agreement });
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // TODO: Add additional validation if needed
          const response = await callJoinAPI(userData);
          if (response.ok) {
            // Registration successful
            console.log("Registration successful");
            // TODO: Redirect to a success page or perform necessary actions
          } else {
            // Registration failed
            console.error("Registration failed");
            // TODO: Handle the error, show a message, etc.
          }
        } catch (error) {
          console.error("Error during registration:", error.message);
          // TODO: Handle the error, show a message, etc.
        }
      };


  return(
    <>
      <div>
        <h1>회원 가입</h1>
        <div>
          <div className="box">
            <img className="profile" src="" alt="" />
            <label htmlFor="uploadFile">
              <img src="" alt="" />
            </label>
            <input
              type="file"
              id="uploadFile"
              name="profile"
              accept="image/*"
            />
          </div>
          <label>닉네임*</label>
          <div>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              name="nickname"
              value={userData.nickname}
              onChange={handleChange}
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
              value={userData.id}
              onChange={handleChange}
            />
            <button>중복 확인</button>
          </div>
          <br/>
          <label>비밀번호*</label><br/>
          <input
            type="password"
            placeholder="8-16자의 영문, 숫자, 특수문자를 포함한 비밀번호 입력"
            name="password"
            value={userData.password}
            onChange={handleChange}
          /><br/>
          <label>비밀번호 확인*</label><br/>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          /><br/>
          <label>이름*</label><br/>
          <input
            type="text"
            placeholder="이름을 입력하세요."
            name="name"
            value={userData.name}
            onChange={handleChange}
          /><br/>
          <label>생년월일*</label><br/>
          <div>
            <input
              type="text"
              id="birthYear"
              placeholder="YYYY"
              name="birthYear"
              value={userData.birthYear}
              onChange={handleChange}
            />
            <span>년</span>
            <select
              id="birthMonth"
              placeholder="Month (MM)"
              name="birthMonth"
              value={userData.birthMonth}
              onChange={handleChange}
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
            <span class="date-separator">월</span>
            <input
              type="text"
              id="birthDay"
              placeholder="Day (DD)"
              name="birthDay"
              value={userData.birthDay}
              onChange={handleChange}
            />
          </div>
          <label>성별*</label><br/>
          <div>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option selected disabled hidden="hidden">성별</option>
              <option value={"Male"} >남성</option>
              <option value={"Female"}>여성</option>
            </select>
          </div>
          <br/>
          <label>Email<small>(선택사항)</small></label><br/>
          <input
            type="text"
            placeholder="선택 입력"
            name="email"
            value={userData.email}
            onChange={handleChange}
          /><br/>
          <label>본인인증*</label><br/>
          <div>
            <Certification />
          </div>
          <div>
          </div>
          <div>
            <input
              type="checkbox"
              checked={userData.agreement}
              onChange={handleCheckboxChange}
            />
            <label>OilJang의 서비스 약관에 동의합니다.</label>
            <a href="">약관 보기</a>
          </div>
          <br/>
          <button onClick={handleSubmit}>회원 가입</button>
        </div>
      </div>
    </>
  )

}

export default Join;