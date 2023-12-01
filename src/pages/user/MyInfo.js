import { callGetUserAPI } from "../../apis/UserAPICalls";
import { useEffect,useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import WithdrawButton from "../../components/user/WithdrawButton";
import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';
import CheckMyPwd from "../../components/user/CheckMyPwd";


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

  const onPasswordValidated = (isValid) => {
    console.log('Password validated:', isValid);
    if (isValid) {
      setIsPasswordValidated(true);
      navigate("/editMyInfo", { state: { isPasswordValidated: true } });
    } else {
      console.log("Incorrect password");
    }
  };



  console.log('user',user);
  console.log('userDetail',userDetail);

  const onClickBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(callGetUserAPI());
  }, [dispatch]);


  useEffect(() => {
    if(user.data){
      console.log('userDetail', user.data);
    }
  },[user.data])

  if (user.loading) {
    return <p>Loading...</p>;
  }

  if (!user.data) {
    return <p>No user data available.</p>;
  }

  const userImageThumbAddr = userDetail.data.userImageThumbAddr.replace('C:\\OIL-JANG_FE\\public', '');
  console.log('userImageThumbAddr',userImageThumbAddr);



  const onClickEditHandler = () => {
    console.log('userDetail.data.EnrollType',userDetail.data.enrollType);
    console.log('EnrollType check',userDetail.data.enrollType === "GOOGLE");
    if (userDetail.data && userDetail.data.enrollType !== "NORMAL") {
      navigate("/editMyInfo", { state: { isPasswordValidated: true } });
    } else {
      openModal();
    }
  };
  


  return (
    <>
      {userDetail && 
        <div>
          <h1>내정보</h1>
          <hr />
          <div>
           
           <div className={ProductDetailCSS.sellerInfoBox}>
              
                <img src={userImageThumbAddr} className={ProductDetailCSS.sellerProfile}/>

              <div className={ProductDetailCSS.sellerInfo}>
                <div className={ProductDetailCSS.sellerName}>
                {userDetail.data.nickname || ''}
                </div>
                </div>
                </div>
            <CheckMyPwd 
              isOpen={isModalOpen}
              closeModal={closeModal}
              userDetail={userDetail} 
              onPasswordValidated={onPasswordValidated}
              />
            <button onClick={onClickEditHandler}>수정하기</button>
            <hr />
            <div>
              <label>이름</label>
              <br />
              <input type="text" value={userDetail.data.name || ''} readOnly />
              <br />
              {console.log('userDetail.data.enrollType',(userDetail.data.enrollType) !== "GOOGLE")}
              {userDetail.data.enrollType === "NORMAL" &&(
              <>
              <label>생년월일</label>
              <br />
              <input type="text" value={userDetail.data.birthDate || ''} readOnly />
              <br />
              </>
              )}
              <label>이메일 주소</label>
              <br />
              <input type="text" value={userDetail.data.email || ''} readOnly />
              <br />
              { userDetail.data.enrollType === "NORMAL" &&(
                <>
              <label>휴대폰 번호</label>
              <br />
              <input type="text" value={userDetail.data.phone || ''} readOnly />
              </>
              )}
              <WithdrawButton/>
              <button onClick={onClickBackHandler}>뒤로가기</button>
            </div>
          </div>
          <br />
        </div>
      }
    </>
  );
}

export default MyInfo;
