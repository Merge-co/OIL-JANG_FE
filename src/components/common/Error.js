import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const onClickBackHandler = () => {
    navigate("/");
  };

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      <div style={centerStyle}>
        <h1>옳지 않은 접근입니다.</h1>
        <button onClick={onClickBackHandler}>뒤로가기</button>
      </div>
    </>
  );
}
export default Error;
