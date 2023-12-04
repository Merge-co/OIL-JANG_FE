import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPostIdAPI } from "../../apis/UserAPICalls";
import Result from "../../components/user/Result";
import UserLayoutCSS from "../../styles/user/UserLayout.module.css";
import UserJoinCSS from "../../styles/user/UserJoin.module.css";

function FindId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const findUser = useSelector((state) => state.userReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthDate: "",
  });

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
    console.log('e.target.value,',e.target.value,);
    console.log('name',form.name);
    console.log('gender',form.gender);
    console.log('birthDate',form.birthDate);
  };

  const onClickHandler = async () => {
    try {
      const result = await dispatch(callPostIdAPI({ form: form }));

      console.log("userData", userData);

      console.log("result.data", result.data);
      if (
        result.data !== null &&
        result.data !== undefined &&
        result.data !== ""
      ) {
        setUserData(result.data);
        openModal();
      } else {
        alert("해당 되는 정보가 없습니다.");
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
          <h3>아이디 찾기</h3>
        </div>
        <div>
          <label>이름</label>
          <br />
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
          <br />
          <label>생년월일</label>
          <br />
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

          <Result
            isOpen={isModalOpen}
            closeModal={closeModal}
            userData={userData}
          />
          <div className={UserJoinCSS.buttonContainer}>
          <button 
          onClick={onClickHandler}
          className={UserJoinCSS.joinButton}
          >
            아이디 찾기
            </button>
          <button 
          onClick={onClickBackHandler}
          className={UserJoinCSS.backButton}
          >뒤로가기
          </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindId;
