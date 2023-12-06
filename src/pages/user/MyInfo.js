import { callGetUserAPI } from "../../apis/UserAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import WithdrawButton from "../../components/user/WithdrawButton";
import CheckMyPwd from "../../components/user/CheckMyPwd";
import UserMypageCSS from "../../styles/user/UserMypage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function MyInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const userDetail = user.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log('userDetail',userDetail);

  const onPasswordValidated = (isValid) => {
    // console.log("Password validated:", isValid);
    if (isValid) {
      setIsPasswordValidated(true);
      navigate("/editMyInfo", { state: { isPasswordValidated: true } });
    } else {
      // console.log("틀린 비밀번호입니다.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(callGetUserAPI());
        setIsLoading(false); 
      } catch (error) {
        // console.error("사용자 정보를 불러오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {

    const centerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", 
    };

    <div style={centerStyle}>
    <FontAwesomeIcon style={{ justifyContent:"center", textAlign:"center", alignContent:"center", width:"5%", height:"5%"}} icon={faSpinner} spin />
  </div>  }

  if (!user.data) {

    const centerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // 화면 전체 높이를 차지하도록 설정
    };

    return (
      <div style={centerStyle}>
        <FontAwesomeIcon style={{ justifyContent:"center", textAlign:"center", alignContent:"center", width:"5%", height:"5%"}} icon={faSpinner} spin />
      </div>
    );
  }

  const userImageThumbAddr =
    userDetail.data && userDetail.data.userImageThumbAddr
      ? userDetail.data.userImageThumbAddr.replace(
          "C:\\OIL-JANG_FE\\public",
          ""
        )
      : "";

  const onClickEditHandler = () => {
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
                  {userDetail.data?.nickname || ""}
                </div>
              </div>
            </div>
            <br />

            <div className={UserMypageCSS.contentSection}>
              <div className={UserMypageCSS.labelInputContainer}>
                <label className={UserMypageCSS.label}>이름</label>

                <input
                  type="text"
                  value=
                  {userDetail.data?.name}
                  readOnly
                  className={UserMypageCSS.inputField}
                />
              </div>

              {(userDetail.data?.enrollType === "NORMAL") && (
                <>
                  <div className={UserMypageCSS.labelInputContainer}>
                    <label className={UserMypageCSS.label}>생년월일</label>

                    <input
                      type="text"
                      value={userDetail.data?.birthDate}
                      readOnly
                      className={UserMypageCSS.inputField}
                    />
                  </div>
                </>
              )}
              {(userDetail.data?.email) && ( <div className={UserMypageCSS.labelInputContainer}>
                <label className={UserMypageCSS.label}>이메일 주소</label>
                <br />
                <input
                  type="text"
                  value={userDetail.data?.email}
                  readOnly
                  className={UserMypageCSS.inputField}
                />
              </div>)}

              {(userDetail.data?.enrollType === "NORMAL") && (
                <>
                  <div className={UserMypageCSS.labelInputContainer}>
                    <label className={UserMypageCSS.label}>휴대폰 번호</label>
                    <input
                      type="text"
                      value={userDetail.data?.phone}
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
