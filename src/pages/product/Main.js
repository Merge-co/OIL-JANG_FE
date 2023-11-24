import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ProductList from "../../components/product/ProductList";
import MainCSS from '../../styles/MainLayout.module.css';
import '../../styles/ImageGallery.css'

function Main() {
    
    const images = [
        {
            original: "/images/siteImage/bannerImg1.png",
        },
        {
            original: "/images/siteImage/bannerImg1.png"
        },
        {
            original: "/images/siteImage/bannerImg1.png"
        },
        {
            original: "/images/siteImage/bannerImg1.png"
        },
        {
            original: "/images/siteImage/bannerImg1.png"
        },
    ];

    return(
        <>
        <div className={MainCSS.MainLayout}>
            <div className={MainCSS.MainBannerLayout}>
                <div>
                    <div className="mainBanner">
                        <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false} showNav={false} slideInterval={5000} autoPlay={true}/>
                    </div>
                </div>
            </div>
            
                <div>
                    <div className={MainCSS.MainTitle}><img src="/images/siteImage/weeklyHot.svg"/>주간! 중고 상품</div>
                    <ProductList type="main"/>   
                </div>
            </div>     
        </>
    );
}

export default Main;