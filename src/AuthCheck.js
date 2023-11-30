import { Navigate } from "react-router-dom";
import { getCookie } from "./modules/CookieModule";

function AuthCheck({component: Component}) {
    return (
        getCookie("accessToken") ? Component : <Navigate to= '/' {...alert("접근할 수 없는 페이지입니다.")} />
    )
}

export default AuthCheck;