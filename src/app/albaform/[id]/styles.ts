'use client';
import { media } from '@/styles/media';
import styled from 'styled-components';

export const CarouselPagination = styled.div`
  position: absolute;
  bottom: 20px;
  right: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--gray100);
  padding: 8px 15px;
  border-radius: 100px;
  font-size: 14px;

  span {
    font-weight: 600;
    color: white;
  }
`;

//Title Component
export const Tag = styled.div`
  background-color: #fff7eb;
  color: var(--primary-orange300);
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-right: 8px;
  padding: 6px 12px;
  border-radius: 4px;
`;

export const Dates = styled.div`
  color: var(--black100);
  margin: 6px 8px;
  font-size: 16px;
`;

export const CarouselReponsive = styled.div`
  position: relative;
  padding: 88px 120px 0;

  @media ${media.desktop} {
    padding: 88px 0 0;
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: 88px 0 0;
    width: 100%;
  }

  @media ${media.tablet} {
    padding: 60px 0 0;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 54px 0 0;
  }
`;

export const DetailResponsive = styled.div`
  position: relative;
  padding: 40px 120px calc(env(safe-area-inset-bottom) + 62px);

  @media ${media.desktop} {
    padding: 40px 0 calc(env(safe-area-inset-bottom) + 62px);
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tablet} {
    padding: 16px 24px calc(env(safe-area-inset-bottom) + 62px);
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 0 24px calc(env(safe-area-inset-bottom) + 62px);
  }
`;
