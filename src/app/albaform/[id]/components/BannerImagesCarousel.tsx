'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselPagination } from '../styles';
import { useState } from 'react';
import Image from 'next/image';
import { CustomSlider } from '@/styles/globalStyle';
import { useImgError } from '@/hooks/common/useImgError';

export default function BannerImagesCarousel({
  imageUrls = [],
}: {
  imageUrls: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const isSingleImage = imageUrls?.length === 1;

  const settings = {
    dots: !isSingleImage,
    infinite: !isSingleImage,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentIndex(index + 1),
    arrows: false,
    autoplay: !isSingleImage,
    autoplaySpeed: 3000,
    draggable: !isSingleImage,
    swipe: !isSingleImage,
  };

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultImg.jpg',
  );

  console.log(imageUrls);

  return (
    <div className='relative'>
      {isSingleImage ? (
        <div className='relative block border border-solid border-line-100 rounded-[8px] overflow-hidden max-lg:rounded-[0] h-[calc(100vw_*_(562/1902))] max-lg:h-[calc(100vw_*_(260/744))] max-md:h-[calc(100vw_*_(260/375))]'>
          <Image
            src={img[String(imageUrls[0])] || imageUrls[0] || defaultImg}
            alt='banner-single'
            fill
            style={{ objectFit: 'cover' }}
            onError={() => handleImgError(String(imageUrls[0]))}
          />
        </div>
      ) : imageUrls.length === 0 ? (
        <div className='relative block border border-solid border-line-100 rounded-[8px] overflow-hidden max-lg:rounded-[0] h-[calc(100vw_*_(562/1902))] max-lg:h-[calc(100vw_*_(260/744))] max-md:h-[calc(100vw_*_(260/375))]'>
          <Image
            src='/images/defaultImg.jpg'
            alt='banner-error'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <>
          <CustomSlider {...settings}>
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className='relative block border border-solid border-line-100 rounded-[8px] overflow-hidden max-lg:rounded-[0] h-[calc(100vw_*_(562/1902))] max-lg:h-[calc(100vw_*_(260/744))] max-md:h-[calc(100vw_*_(260/375))]'
              >
                <Image
                  src={img[String(url)] || url || defaultImg}
                  alt={`banner-${idx}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={() => handleImgError(String(url))}
                />
              </div>
            ))}
          </CustomSlider>
          <CarouselPagination>
            <span>{currentIndex}</span> / {imageUrls.length}
          </CarouselPagination>
        </>
      )}
    </div>
  );
}
