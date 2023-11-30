import { Navigate } from "react-router-dom";
import { getCookie } from "./modules/CookieModule";
import { jwtDecode } from "jwt-decode";

function AuthCheck({component: Component, require: Reqiure}) {

    switch(Reqiure) {
        case "Admin":
            return (
                getCookie("accessToken") && jwtDecode(getCookie("accessToken")).Role[0] === "ROLE_ADMIN" ? Component : <Navigate to= '/' {...alert("접근할 수 없는 페이지입니다.")} />
            )
        case "User":
            return (
                !getCookie("accessToken") ? <Navigate to= '/login'/> : getCookie("accessToken") && (jwtDecode(getCookie("accessToken")).Role[0] === "ROLE_ADMIN") ? <Navigate to= '/' {...alert("접근할 수 없는 페이지입니다.")} /> : Component
            )
        case "Login" :
            return (
                !getCookie("accessToken") ? <Navigate to= '/login'/> : Component
            )
        default:
            break;
    }
    
}

export default AuthCheck;