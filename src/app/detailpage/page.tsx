'use client';

import BannerImagesCarousel from "./components/BannerImagesCarousel";


export default function detailPage(){

    const images = ['/images/albaformList/image 7.png', '/images/landingImg/landing1.svg', '/images/landingImg/landing2.svg']; // ✅ 공백 제거 주의!

    return(
        <div>
            <BannerImagesCarousel images={images}/>

        </div>
    )
}