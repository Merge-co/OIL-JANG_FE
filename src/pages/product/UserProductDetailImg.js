import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/product/ProductDetailImg.css";

function UserProductDetailImg(productDetailImg) {
    console.log(productDetailImg.productDetailImg.detailImg1);

    const images = [
        {
            original: "/images/siteImage/sample.jpg"
        },
    ];

    return(
        <>
            <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>
        </>
    );
}

export default UserProductDetailImg;
