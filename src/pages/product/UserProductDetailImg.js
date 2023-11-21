import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/"
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/"
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/"
    },
];

// const onErrorImg = (e) => {
//     e.target.src = "/images/home.svg";
// }

function UserProductDetailImg(productDetailImg) {
    return(
        <>
            <ImageGallery items={images}  showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false} autoPlay={true}/>
            {/* <img src={productDetailImg && productDetailImg} alt="상품 이미지" className={ProductDetailCSS.productDetailLeftImage} onError={onErrorImg}/> */}
        </>
    );
}

export default UserProductDetailImg;
