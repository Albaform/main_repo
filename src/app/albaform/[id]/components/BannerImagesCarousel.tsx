'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselPagination } from '../styles';
import { useState } from 'react';
import Image from 'next/image';
import { CustomSlider } from '@/styles/globalStyle';

export default function BannerImagesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const fallbackImages = [
    '/images/testDetail.png',
    '/images/testDetail.png',
    '/images/testDetail.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentIndex(index + 1),
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='relative'>
      <CustomSlider {...settings}>
        {fallbackImages.map((url, idx) => (
          <div
            key={idx}
            className='relative block border border-solid border-line-100 rounded-[8px] overflow-hidden max-lg:rounded-[0] h-[calc(100vw_*_(562/1902))] max-lg:h-[calc(100vw_*_(260/744))] max-md:h-[calc(100vw_*_(260/375))]'
          >
            <Image
              src={url}
              alt={`banner-${idx}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </CustomSlider>
      <CarouselPagination>
        <span>{currentIndex}</span> / {fallbackImages.length}
      </CarouselPagination>
    </div>
  );
}
