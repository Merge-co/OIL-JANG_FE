import { callDeleteUserAPI,callLogoutAPI } from "../../apis/UserAPICalls";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserMypageCSS from "../../styles/user/UserMypage.module.css";


function WithdrawButton() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const navigate = useNavigate();


    const onClickWithdrawHandler = () => {

        const shouldWithdraw = window.confirm("정말로 탈퇴하시겠습니까?");
        
        if (shouldWithdraw) {
            dispatch(callDeleteUserAPI())
              .then(() => dispatch(callLogoutAPI()))
              .then(() => navigate("/", { replace: true }))
              .catch((error) => {
                console.error("탈퇴 중 에러 발생:", error);
              });
          }

    }
    
    return(
        <>
        <button onClick={onClickWithdrawHandler} className={UserMypageCSS.withdrawButton}>
            탈퇴하기
            <hr/>
        </button>
        </>
    )
    
}

export default WithdrawButton;