import { callUpdateUserAPI } from "../../apis/UserAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductDetailCSS from "../../styles/product/ProductDetailCss.module.css";

function EditMyInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const userDetail = user && user.data ? user.data : {};

  console.log("user", user);

  console.log("userDetail", userDetail);

  const [userData, setUserData] = useState({
    profileImage: null,
    nickname: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const onClickCompleteHandler = () => {
    // 업데이트할 데이터를 userData 상태에서 가져와서 처리
    const updatedData = {
      profileImage: userData.profileImage,
      nickname: userData.nickname,
      newPassword: userData.newPassword,
      newPasswordConfirm: userData.newPasswordConfirm,
    };

    console.log("userData.profileImage : ", userData.profileImage);
    console.log("userData.profileImage : ", userData.nickname);
    console.log("userData.profileImage : ", userData.nickname);
    console.log("userData.profileImage : ", userData.newPasswordConfirm);

    console.log("updatedData : ", updatedData);

    dispatch(callUpdateUserAPI({ updatedData }));
    // if (!user.error) {
    //  navigate("/myInfo")
    // }
  };

  useEffect(() => {
    if (userDetail) {
      setUserData({
        ...userData,
        nickname: userDetail?.nickname || "",
      });
    }
  }, [userDetail]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = name === "profileImage" ? e.target.files[0] : e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const userImageThumbAddr = userDetail.data.userImageThumbAddr.replace(
    "D:\\OIL-JANG_FE\\public",
    ""
  );

  console.log("userImageThumbAddr : ", userImageThumbAddr);

  const userImageThumbAddr2 = userDetail.data.userImageThumbAddr.replace(
    "D:/OIL-JANG_FE/public",
    ""
  );
  console.log("userImageThumbAddr2 : ", userImageThumbAddr2);

  const onClickBackHandler = () => {
    
    alert("취소 하시겠습니까?")

    navigate("/myInfo", { replace: true })
}

  return (
    <>
      {userDetail && (
        <div>
          <h1>내정보 수정</h1>

          <div className={ProductDetailCSS.sellerInfoBox}>
            <img
              src={userImageThumbAddr}
              className={ProductDetailCSS.sellerProfile}
            />
            <div className={ProductDetailCSS.sellerInfo}></div>
          </div>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={onChangeHandler}
          />
          <div>
            <label>닉네임</label>
            <br />
            <input
              type="text"
              placeholder={userDetail.data.nickname}
              onChange={onChangeHandler}
              name="nickname"
            />
            <button>중복 확인</button>
            <br />
            <label>아이디</label>
            <br />
            <input type="text" placeholder={userDetail.data.id} readOnly />
            <br />
            <label>변경할 비밀번호</label>
            <br />
            <input
              type="password"
              placeholder="영문,숫자,특수문자 포함 8-16자"
              onChange={onChangeHandler}
              name="newPassword"
            />
            <br />
            <label>변경할 비밀번호 확인</label>
            <br />
            <input
              type="password"
              placeholder="작성한 비밀번호를 다시 입력해주세요."
              name="newPasswordConfirm"
              onChange={onChangeHandler}
            />
            <br />
            <label>이름</label>
            <br />
            <input type="text" value={userDetail.data.name} readOnly />
            <br />
            <label>생년월일</label>
            <br />
            <input type="text" value={userDetail.data.birthDate} readOnly />
            <br />
            <label>이메일 주소</label>
            <br />
            <input type="text" value={userDetail.data.email} readOnly />
            <br />
            <label>휴대폰 번호</label>
            <br />
            <input type="text" value={userDetail.data.phone} readOnly />
            <br />
            <div>
              <button onClick={onClickCompleteHandler}>완료</button>
              <button onClick={onClickBackHandler}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditMyInfo;
