import { callJoinAPI } from "../../apis/UserAPICalls";
import userReducer, { POST_JOIN } from "../../modules/UserModule";
import Certification from"../../components/user/Certification";

function MyInfo() {
  return (
    <>
      <div>
        <h1>내정보</h1>
        <hr />

        <div class="login-wrapper">
          <div>
            <div class="box">
              <img class="profile" src="/" />
            </div>
            <h1>맥북 컬렉터</h1>
          </div>
          <Certification/> 수정하기
          <br />
          <hr />
          <div class="login-item">
            <label>이름</label>
            <br />
            <input type="text" value="김민범" readonly />
            <label>생년월일</label>
            <br />
            <input type="text" value="1998-10-12" readonly />
            <label>이메일 주소</label>
            <br />
            <input type="text" value="j****0@gmail.com" readonly />
            <label>휴대폰 번호</label>
            <br />
            <input type="text" value="010-9***-6954" readonly />
            <button>회원탈퇴</button>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default MyInfo;
