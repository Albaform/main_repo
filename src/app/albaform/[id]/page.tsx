'use client';

import BannerImagesCarousel from './components/BannerImagesCarousel';
import JobDescription from './components/JobDescription';
import JobLocation from './components/JobLocation';
import Title from './components/Title';
import { CarouselReponsive, DetailResponsive } from './styles';

export default function detailPage() {
  return (
    <>
      <CarouselReponsive>
        <div className='pt-[78px] max-lg:pt-[0]'>
          <BannerImagesCarousel />
        </div>
      </CarouselReponsive>
      <DetailResponsive>
        <Title />
        <JobDescription />
        <JobLocation />
      </DetailResponsive>
    </>
  );
}
