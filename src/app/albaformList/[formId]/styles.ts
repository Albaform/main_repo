'use client';
import { media } from "@/styles/media";
import styled from "styled-components";

//배너이미지
export const BannerImages = styled.div`
     margin: 78px auto 80px auto;
    width: 1560px;
    height: 562px;
    border-radius: 8px;
   
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
    object-fit: cover;
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

//Title Component
export const Tag = styled.div`
    background-color: #FFF7EB;
    color: var(--primary-orange300);
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-right: 8px;
    padding: 6px 12px;
    border-radius: 4px;
`

export const Dates = styled.div`
    color: var(--black100);
    margin: 6px 8px;
    font-size: 16px;
`

export const TextArea = styled.div`
  width: 100%;
  max-width: 770px;
  height: 100%;
  max-height: 320px;
  font-size: 24px;
  color: var(--black400);
  `
