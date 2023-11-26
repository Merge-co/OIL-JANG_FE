import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import FooterCSS from "../styles/Footer.module.css";

function Layout() {
    return (
        <>
            <div className={FooterCSS.footerHeight}>
                <div className={FooterCSS.contentWrapper}>\
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;