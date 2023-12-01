import { useNavigate } from "react-router-dom";


function Error() {

    const navigate = useNavigate();
    
    const onClickBackHandler = () => {
        navigate("/");
      };

    return(
        <>
        <h1>옳지 않은 접근입니다.</h1>
        <button onClick={onClickBackHandler}>뒤로가기</button>
        </>
    )

}
export default Error;