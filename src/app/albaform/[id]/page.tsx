'use client';

import BannerImagesCarousel from './components/BannerImagesCarousel';
import Section2 from './components/Section2/Section2';
import Section1 from './components/Section1/Section1';
import { CarouselReponsive, DetailResponsive } from './styles';
import { useState } from 'react';
import Toast from '@/components/tooltip/Toast';
import FloatingButton from '@/components/floatingbutton/FloatingButton';

export default function detailPage() {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <CarouselReponsive>
        <div className='pt-[78px] max-lg:pt-[0]'>
          <BannerImagesCarousel />
        </div>
      </CarouselReponsive>
      <DetailResponsive>
        <Section1 />
        <Section2 setCopied={setCopied} />
      </DetailResponsive>
      {copied && (
        <Toast onClose={() => setCopied(false)}>
          {copied ? '복사 완료 !' : ''}
        </Toast>
      )}
      <FloatingButton $albaformDetail/>
    </>
  );
}
