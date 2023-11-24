import Certification from"../../components/user/Certification";

function FindId() {
  return (
    <>
      <div class="login-wrapper">
        <h1>아이디 찾기</h1>
        <div class="login-item">
          <label>휴대전화</label>
          <br />
          <div class="input-with-button">
            <Certification />
          </div>
          <button>아이디 찾기</button>
        </div>
      </div>
    </>
  );
}

export default FindId;
