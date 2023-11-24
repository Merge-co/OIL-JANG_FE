function ChangePwd(params) {
  return (
    <>
      <div class="login-wrapper">
        <h1>비밀번호 변경</h1>
        <div class="login-item">
          <label>변경할 비밀번호</label>
          <br />
          <input type="text" placeholder="영문,숫자,특수문자 포함 8-16자" />
          <br />
          <label>변경할 비밀번호 확인</label>
          <br />
          <input
            type="text"
            placeholder="작성한 비밀번호를 다시 입력해주세요."
          />
          <br />
          <button>비밀번호 변경</button>
        </div>
      </div>
    </>
  );
}

export default ChangePwd;
