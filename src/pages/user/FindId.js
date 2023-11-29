import Certification from"../../components/user/Certification";

function FindId() {
  return (
    <>
      <div >
        <h1>아이디 찾기</h1>
        <div >
          <label>휴대전화</label>
          <br />
          <div>
            <Certification />
          </div>
          <button>아이디 찾기</button>
        </div>
      </div>
    </>
  );
}

export default FindId;
