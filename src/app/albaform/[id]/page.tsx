'use client';

import BannerImagesCarousel from './components/BannerImagesCarousel';
import Section2 from './components/section2/Section2';
import Section1 from './components/section1/Section1';
import { CarouselReponsive, DetailResponsive } from './styles';
import { useState } from 'react';
import Toast from '@/components/tooltip/Toast';
import FloatingButton from '@/components/floatingbutton/FloatingButton';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import Section3 from './components/section3/Section3';

export default function detailPage() {
  const [copied, setCopied] = useState(false);

  const { data: userData, isLoading: getUserLoading } = useGetMyInfo();
  const { role } = userData ?? {};

  return (
    <>
      <CarouselReponsive>
        <div className='pt-[78px] max-lg:pt-[0]'>
          <BannerImagesCarousel />
        </div>
      </CarouselReponsive>
      <DetailResponsive $owner={role === 'OWNER'}>
        <Section1 />
        <Section2
          setCopied={setCopied}
          role={role}
          isLoading={getUserLoading}
        />
      </DetailResponsive>
      {/* + 유저아이디와 알바폼생성유저가 일치할 때만 보여야함 */}
      {!getUserLoading && role === 'OWNER' && <Section3 />}
      {copied && (
        <Toast onClose={() => setCopied(false)}>
          {copied ? '복사 완료 !' : ''}
        </Toast>
      )}
      <FloatingButton $albaformDetail role={role} />
    </>
  );
}
