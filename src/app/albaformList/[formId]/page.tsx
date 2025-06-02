'use client';

import BannerImagesCarousel from "./components/BannerImagesCarousel";
import JobDescription from "./components/JobDescription";
import Title from "./components/Title";


export default function detailPage(){

    const images = ['/images/albaformList/image 7.png', '/images/landingImg/landing1.svg', '/images/landingImg/landing2.svg']; // ✅ 공백 제거 주의!

    return(
        <div className="pr-[120px] pl-[120px]">
            <BannerImagesCarousel images={images}/>
            <Title/>
            <JobDescription/>
        </div>
    )
}