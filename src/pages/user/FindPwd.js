import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPostIdAPI } from "../../apis/UserAPICalls";
import ChangePwd from "./ChangePwd";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import UserJoinCSS from "../../styles/user/UserJoin.module.css";

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

  const onClickHandler = async () => {
    try {
      const result = await dispatch(callPostIdAPI({ form: form }));
      setUserData(result.data);

      console.log("userData", userData);

      console.log("result.data", result.data);
      if (
        result.data === null ||
        result.data === undefined ||
        result.data === ""
      ) {
        alert("해당 되는 정보가 없습니다.");
        return;
      } else if (form.id !== result.data) {
        alert("해당 되는 정보가 없습니다.");
        return;
      } else {
        openModal();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onClickBackHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={UserLayoutCSS.container}>
        <div>
          <h3>비밀번호 찾기</h3>
        </div>
        <div>
          <label>아이디</label>
          <div className={UserJoinCSS.input_nickname_check_btn}>
            <input
              type="text"
              name="id"
              onChange={onChangeHandler}
              className={UserLayoutCSS.input_pwd}
            />
          </div>
          <br />
          <label>이름</label>
          <div className={UserJoinCSS.input_nickname_check_btn}>
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              className={UserLayoutCSS.input_pwd}
            />
          </div>
          <br />
          <div className={UserJoinCSS.genderSelectContainer}>
            <label htmlFor="gender" className={UserJoinCSS.genderLabel}>
              성별*
            </label>
            <div>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={onChangeHandler}
                className={UserJoinCSS.genderSelect}
                required
              >
                <option value="" disabled hidden="hidden">
                  성별
                </option>
                <option value={"남"}>남성</option>
                <option value={"여"}>여성</option>
              </select>
            </div>
          </div>
          <br/>
          <label>생년월일</label>
          <div className={UserJoinCSS.input_nickname_check_btn}>
            <input
              type="text"
              required
              pattern="\d{8}"
              name="birthDate"
              maxLength={8}
              placeholder="예) 19900101"
              onChange={onChangeHandler}
              className={UserLayoutCSS.input_pwd}
            />
          </div>
          <br />

          <ChangePwd
            isOpen={isModalOpen}
            closeModal={closeModal}
            userData={userData}
          />
          <div className={UserJoinCSS.buttonContainer}>
            <button onClick={onClickHandler} className={UserJoinCSS.joinButton}>
              비밀번호 변경
            </button>
            <button
              onClick={onClickBackHandler}
              className={UserJoinCSS.backButton}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindPwd;
