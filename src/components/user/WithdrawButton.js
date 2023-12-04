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
        
        dispatch(callDeleteUserAPI());
        dispatch(callLogoutAPI());
        navigate("/", { replace: true })

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