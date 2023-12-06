import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ProductList from "../../components/product/ProductList";
import MainCSS from '../../styles/MainLayout.module.css';
import '../../styles/ImageGallery.css'
import { useNavigate } from "react-router-dom";
import banner1 from '../../images/siteImage/bannerImg1.png';
import banner2 from '../../images/siteImage/bannerImg2.png';
import banner3 from '../../images/siteImage/bannerImg3.png';
import banner4 from '../../images/siteImage/bannerImg4.png';
import banner5 from '../../images/siteImage/bannerImg5.png';

function Main() {
    
    const images = [
        {
            original: banner1
        },
        {
            original: banner2
        },
        {
            original: banner3
        },
        {
            original: banner4
        },
        {
            original: banner5
        },
    ];

    const navigate = useNavigate();

    const onClick = event => {
        let url = event.target.src.toString();
        url.indexOf("bannerImg1") !== -1 && navigate(`/merge`);
        url.indexOf("bannerImg2") !== -1 && navigate(`/usedProduct`);
        url.indexOf("bannerImg3") !== -1 && navigate(`/merge`);
        url.indexOf("bannerImg4") !== -1 && navigate(`/addProduct`);
        url.indexOf("bannerImg5") !== -1 && navigate(`/myCalendar`);
    }

    return(
        <>
            <div className={MainCSS.MainBannerLayout}>
                <div>
                    <div className="mainBanner">
                        <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false} showNav={false} slideInterval={3000} autoPlay={true} onClick={onClick}/>
                    </div>
                </div>
            </div>
            <div className={MainCSS.MainLayout}>
                
                <div>
                    
                    <ProductList type="main"/>   
                </div>
            </div>     
        </>
    );
}

export default Main;