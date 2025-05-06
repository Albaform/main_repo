'use client';
import { media } from "@/styles/media";
import styled from "styled-components";

//배너이미지
export const BannerImages = styled.div`
    margin: 78px 180px 80px 180px;
    width: 1560px;
    height: 562px;
    border-radius: 8px;
    margin: auto;
    display: flex;
    justify-content: center;


     @media ${media.tablet} {
    margin-bottom: 32px;
    max-width: 1480px;
    margin: 0 auto;
    width: 744px;
    height: 260px;
    display: flex;
    justify-content: center;
  }

     @media ${media.mobile} {
    margin-bottom: 32px;
    max-width: 1480px;
    margin: 0 auto;
    width: 375px;
    height: 260px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

`

export const BannerImg = styled.img`
    width: 1560px;
    height: 562px;
    margin-top: 78px;
    @media ${media.tablet} {
        width: 744px;
        height: 260px;
      
  }

     @media ${media.mobile} {
        width: 375px;
        height: 260px;

  }
`

export const CarouselPagination = styled.div`
  position: absolute;
  bottom: 16px;
  right: 200px;
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