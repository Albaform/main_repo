'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

// 알바폼 바로가기 버튼
const Button = styled.button`
  background-color: var(--primary-blue300);
  color: var(--white);
  width: 223px;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  padding: 24px 36px;
  margin-top: 10px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background: var(--primary-orange400);
  }

  @media (max-width: 1199px) {
    width: 149px;
    font-size: 16px;
    line-height: 26px;
    padding: 16px 24px;
    margin-top: 18px;
  }
`;

const Banner = styled.div`
  max-width: 1322px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 0 179px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    max-width: 411px;
    padding: 0;
  }
`;

const Title = styled.h1`
  color: var(--white);
  font-size: 48px;
  font-weight: 400;
  line-height: 80px;

  @media (max-width: 1199px) {
    font-size: 32px;
    line-height: 32px;
  }

  @media (max-width: 810px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

// 배너이미지
const BannerImg = styled.div`
  // position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1.58 / 1;
  background-image: url('/images/landingImg/landing1.svg');
  background-size: cover;
  background-position: center;

  @media (max-width: 1199px) {
    margin-top: 19px;
  }
`;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { user: userData, hasHydrate } = useAuthStore();

  const router = useRouter();
  const albaformStartUrl = () => {
    if (!userData) {
      if (hasHydrate) {
        router.push('/signin/applicant');
      }
    } else {
      router.push('/albaform');
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageSrc2 = isMobile
    ? '/images/landingImg/landing2-1.svg'
    : '/images/landingImg/landing2.svg';
  const imageSrc3 = isMobile
    ? '/images/landingImg/landing3-1.svg'
    : '/images/landingImg/landing3.svg';
  const imageSrc4 = isMobile
    ? '/images/landingImg/landing4-1.svg'
    : '/images/landingImg/landing4.svg';
  const imageSrc5 = isMobile
    ? '/images/landingImg/landing5-1.svg'
    : '/images/landingImg/landing5.svg';

  return (
    <>
      {/* 배너 */}
      <div
        className='
        relative bg-[var(--black400)] w-full h-[633px] 
        md:h-auto md:aspect-[1.23/1] max-h-[calc(100%-88px)] mt-[88px] max-md:mt-[60px] max-xs:mt-[55px] max-xs:h-[600px] max-s:h-[500px]'
      >
        <Banner>
          <div
            className='
            relative w-[124px] h-[24px] 
            min-[811px]:w-[186px] min-[811px]:h-[36px] lg:w-[248px] lg:h-[48px]'
          >
            <Image
              src={'/images/albaform.svg'}
              alt='logo'
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Title>한 곳에서 관리하는 알바 구인 플랫폼</Title>
          <Button onClick={albaformStartUrl}>알바폼 시작하기</Button>
          <BannerImg />
        </Banner>
      </div>

      {/* 메인 */}
      <div
        className='
        flex flex-col items-center gap-[120px] 
        max-w-[964px] px-[24px] py-[120px] mx-auto 
        sm:px-20 md:py-[200px] md:gap-[140px] lg:px-0 lg:gap-[180px]'
      >
        {[imageSrc2, imageSrc3, imageSrc4, imageSrc5].map((src, idx) => (
          <div
            key={idx}
            className='relative w-full h-auto aspect-[0.95/1] md:aspect-[1.78/1]'
          >
            <Image
              src={src}
              alt={`landing${idx + 2}`}
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}

        <div className='flex flex-col items-center gap-[40px] lg:gap-20'>
          <p
            className='
            text-[var(--black)] text-center font-bold text-[24px] leading-[32px] 
            sm:text-[32px] sm:leading-[46px] 
            lg:text-[48px] lg:leading-[68px]'
          >
            한 곳에서 관리하는
            <br />
            알바구인 플랫폼
          </p>
          <Button onClick={albaformStartUrl}>알바폼 시작하기</Button>
        </div>
      </div>
    </>
  );
}
