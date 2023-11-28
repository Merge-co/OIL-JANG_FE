import { callDeleteUserAPI,callLogoutAPI } from "../../apis/UserAPICalls";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



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
        <button onClick={onClickWithdrawHandler}>회원탈퇴</button>
        </>
    )
    
}

export default WithdrawButton;