'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

// 알바폼 바로가기 버튼
const Button = styled(Link)`
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

  @media (max-width: 1199px) {
    width: 149px;
    font-size: 16px;
    line-height: 26px;
    padding: 16px 24px;
    margin-top: 18px;
  }
`;

const Main = styled.main`
  position: relative;
  background-color: var(--black400);
  width: 100%;
  height: auto;
  aspect-ratio: 1.28 / 1;

  @media (max-width: 768px) {
    height: 633px;
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
  font-size: 56px;
  font-weight: 400;
  line-height: 80px;

  @media (max-width: 1199px) {
    font-size: 32px;
    line-height: 32px;
  }

  @media (max-width: 820px) {
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
  return (
    <>
      <Main>
        <Banner>
          <Image
            src={'/images/albaform.svg'}
            alt='logo'
            width={248}
            height={48}
            priority
          />
          <Title>한 곳에서 관리하는 알바 구인 플랫폼</Title>
          <Button href={'/'}>알바폼 시작하기</Button>
          <BannerImg />
        </Banner>
      </Main>
      <div>랜딩</div>
    </>
  );
}
