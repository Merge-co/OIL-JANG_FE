import { Outlet } from "react-router-dom";
import MyPageHeader from "../components/common/MyPageHeader";


function MyPageLayout() {
    return (
        <>
            <MyPageHeader/>
            <Outlet/>
        </>
    )
}

export default MyPageLayout;