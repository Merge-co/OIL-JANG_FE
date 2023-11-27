import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/product/ProductDetailImg.css";

function UserProductDetailImg(productDetailImg) {

    let imgArr = Object.entries(productDetailImg.productDetailImg).sort();

    const images = [];
    imgArr.map(img => {  
        images.push({original: img[1]});
    })

    return(
        <>
            <div className="productDetailGallery">
                <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>
            </div>
        </>
    );
}

export default UserProductDetailImg;
