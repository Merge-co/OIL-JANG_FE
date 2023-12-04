import { callGetUserAPI } from "../../apis/UserAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import WithdrawButton from "../../components/user/WithdrawButton";
import CheckMyPwd from "../../components/user/CheckMyPwd";
import UserMypageCSS from "../../styles/user/UserMypage.module.css";

function MyInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const userDetail = user.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log('userDetail',userDetail);

  const onPasswordValidated = (isValid) => {
    console.log("Password validated:", isValid);
    if (isValid) {
      setIsPasswordValidated(true);
      navigate("/editMyInfo", { state: { isPasswordValidated: true } });
    } else {
      console.log("Incorrect password");
    }
  };

  console.log("user", user);
  console.log("userDetail", userDetail);

  useEffect(() => {
    dispatch(callGetUserAPI());
  }, [dispatch]);

  useEffect(() => {
    if (user.data) {
      console.log("userDetail", user.data);
    }
  }, [user.data]);

  if (user.loading) {
    return <p>Loading...</p>;
  }

  if (!user.data) {
    return <p>No user data available.</p>;
  }

  const userImageThumbAddr = userDetail.data.userImageThumbAddr
  ? userDetail.data.userImageThumbAddr.replace(
      "C:\\OIL-JANG_FE\\public",
      ""
    )
  : "";
  console.log("userImageThumbAddr", userImageThumbAddr);

  const onClickEditHandler = () => {
    console.log("userDetail.data.EnrollType", userDetail.data.enrollType);
    console.log("EnrollType check", userDetail.data.enrollType === "GOOGLE");
    if (userDetail.data && userDetail.data.enrollType !== "NORMAL") {
      navigate("/editMyInfo", { state: { isPasswordValidated: true } });
    } else {
      openModal();
    }
  };

  return (
    <>
      {userDetail && (
        <>
          <div className={UserMypageCSS.myPageSection}>
            <h1>내 정보</h1>
            <div className={UserMypageCSS.editButtonContainer}>
            <CheckMyPwd 
              isOpen={isModalOpen}
              closeModal={closeModal}
              userDetail={userDetail} 
              onPasswordValidated={onPasswordValidated}
              />
              <button
                onClick={onClickEditHandler}
                className={UserMypageCSS.editButton}
              >
                수정
              </button>
            </div>
          </div>
          <div style={{ width: "70%", margin: "0 auto" }}>
            <hr />
          </div>
          <div className={UserMypageCSS.myPageContainer}>
            <div className={UserMypageCSS.profileSection}>
              <img
                src={userImageThumbAddr}
                alt="프로필 이미지"
                className={UserMypageCSS.profileImage}
              />

              <div className={UserMypageCSS.userInfo}>
                <div className={UserMypageCSS.userName}>
                  {userDetail.data.nickname || ""}
                </div>
              </div>
            </div>
            <br />

            <div className={UserMypageCSS.contentSection}>
              <div className={UserMypageCSS.labelInputContainer}>
                <label className={UserMypageCSS.label}>이름</label>

                <input
                  type="text"
                  value={userDetail.data.name || ""}
                  readOnly
                  className={UserMypageCSS.inputField}
                />
              </div>

              {userDetail.data.enrollType === "NORMAL" && (
                <>
                  <div className={UserMypageCSS.labelInputContainer}>
                    <label className={UserMypageCSS.label}>생년월일</label>

                    <input
                      type="text"
                      value={userDetail.data.birthDate || ""}
                      readOnly
                      className={UserMypageCSS.inputField}
                    />
                  </div>
                </>
              )}

              <div className={UserMypageCSS.labelInputContainer}>
                <label className={UserMypageCSS.label}>이메일 주소</label>
                <br />
                <input
                  type="text"
                  value={userDetail.data.email || ""}
                  readOnly
                  className={UserMypageCSS.inputField}
                />
              </div>

              {userDetail.data.enrollType === "NORMAL" && (
                <>
                  <div className={UserMypageCSS.labelInputContainer}>
                    <label className={UserMypageCSS.label}>휴대폰 번호</label>
                    <input
                      type="text"
                      value={userDetail.data.phone || ""}
                      readOnly
                      className={UserMypageCSS.inputField}
                    />
                  </div>
                </>
              )}

              <WithdrawButton/>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyInfo;
