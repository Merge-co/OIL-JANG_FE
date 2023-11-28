import { callGetUserAPI } from "../../apis/UserAPICalls";
import Certification from "../../components/user/Certification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WithdrawButton from "../../components/user/WithdrawButton";
import ProductDetailCSS from '../../styles/product/ProductDetailCss.module.css';


function MyInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const userDetail = user.data;

  console.log('user',user);
  console.log('userDetail',userDetail);

  const onClickBackHandler = () => {
    // 돌아가기 클릭시 메인 페이지로 이동
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
    // 로딩 중일 때의 UI 표시
    return <p>Loading...</p>;
  }

  if (!user.data) {
    // 데이터가 없을 때의 UI 표시
    return <p>No user data available.</p>;
  }

  const userImageThumbAddr = userDetail.data.userImageThumbAddr.replace('D:\\OIL-JANG_FE\\public', '');
  console.log('userImageThumbAddr : ',userImageThumbAddr);


  const userImageThumbAddr2 = userDetail.data.userImageThumbAddr.replace('D:/OIL-JANG_FE/public', '');
  console.log('userImageThumbAddr2 : ',userImageThumbAddr2);


  const onClickEditHandler = () => {
    navigate("/editMyInfo", { replace: true })
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
           
            <Certification /> 
            <button onClick={onClickEditHandler}>수정하기</button>
            <br />
            <hr />
            <div>
              <label>이름</label>
              <br />
              <input type="text" value={userDetail.data.name || ''} readOnly />
              <br />
              <label>생년월일</label>
              <br />
              <input type="text" value={userDetail.data.birthDate || ''} readOnly />
              <br />
              <label>이메일 주소</label>
              <br />
              <input type="text" value={userDetail.data.email || ''} readOnly />
              <br />
              <label>휴대폰 번호</label>
              <br />
              <input type="text" value={userDetail.data.phone || ''} readOnly />
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
