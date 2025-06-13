'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { BannerImages, BannerImg, CarouselPagination } from '../styles';
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function BannerImagesCarousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(1);

  // fallback 이미지 설정
  const fallbackImages = ['/images/albaformList/image7.png', '/images/landingImg/landing1.svg', '/images/landingImg/landing2.svg']; // ✅ 공백 제거 주의!

  const displayImages = images.length > 0 ? images : fallbackImages;

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentIndex(index + 1),
  };

  return (
    <div className='relative mb-[80px]'>
      <Slider {...settings}>
        {displayImages.map((url, idx) => (
          <div key={idx}>
            <BannerImages>
              <BannerImg
                src={url}
                alt={`banner-${idx}`}
              />
              
            </BannerImages>
            
          </div>
        ))}
      </Slider>
      <CarouselPagination>
        <span>{currentIndex}</span> / {displayImages.length}
      </CarouselPagination>
      
    </div>
  );
}
