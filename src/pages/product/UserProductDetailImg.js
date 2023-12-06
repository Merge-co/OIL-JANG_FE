import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/product/ProductDetailImg.css";
import noProductImg from '../../images/siteImage/noProductImg.svg';

function UserProductDetailImg(productDetailImg) {

    let imgArr = Object.entries(productDetailImg.productDetailImg).sort();

    const images = [];
    imgArr.map(img => {  
        images.push({original: img[1]});
    })
    if(imgArr.length === 0) {
        images.push({original: noProductImg});
    }

    return(
        <>
            <div className="productDetailGallery">
                <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>
            </div>
        </>
    );
}

export default UserProductDetailImg;
