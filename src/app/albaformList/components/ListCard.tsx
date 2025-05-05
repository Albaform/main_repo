'use client';

import {
BannerImg, 
BottomCard, 
BottomSectionFirst, 
BottomSectionSecond, 
BottomSectionThird, 
Dates, 
Kebab, 
ListCardContainer, 
Tag, 
Text,
VerticalDivider,
 } from "../styles";
import Image from "next/image";
import { FormData } from '../types';
import { useState } from "react";


interface ListCardProps {
    form: FormData; 
  }
  

export default function ListCard({ form }: ListCardProps){

    const [imgSrc, setImgSrc] = useState(form.imageUrls[0] || '/images/albaformList/image 7.png');
    const kebabIcon = '/images/albaformList/kebab-menu.png';


    //fallback이미지
    const handleError = () => {
        setImgSrc('/images/albaformList/image 7.png'); // fallback 이미지
      };
    //마감일 계산 

    function getDday(recruitmentEndDate: string): string {
        const today = new Date();
        const endDate = new Date(recruitmentEndDate);
    
        // 오늘 날짜의 시간을 00:00:00으로 리셋
        today.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
    
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffDays < 0) return '마감';
        if (diffDays === 0) return 'D-DAY';
        return `D-${diffDays}`;
    }

    //모집중 계산
  function getRecruitStatus(startDate: string, endDate: string): '모집중' | '모집 예정' | '모집 마감' {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // 날짜만 비교
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
      
        if (today < start) return '모집 예정';
        if (today > end) return '모집 마감';
        return '모집중';
      }
    
    //fallback 이미지 함수
  

    return(

        <div>
            <ListCardContainer>
                <BannerImg>
                    <Image 
                    src={imgSrc} 
                    alt="bannerImg" 
                    width={477} 
                    height={304} 
                    onError={handleError}
                />
                </BannerImg>
                <BottomCard>
                    <BottomSectionFirst>
                        <Tag>
                            {form.isPublic ? '공개' : '비공개'}
                        </Tag>
                        <Tag>
                             {getRecruitStatus(form.recruitmentStartDate, form.recruitmentEndDate)}
                        </Tag>
                        <Dates>
                            {form.recruitmentStartDate.slice(0, 10)} ~ {form.recruitmentEndDate.slice(0, 10)}
                        </Dates>
                        <Kebab>
                            <Image src={kebabIcon} alt="kebabIcon" width={36} height={36} />
                        </Kebab>
                    </BottomSectionFirst>
                    <BottomSectionSecond>
                        {form.title}
                    </BottomSectionSecond>
                    <BottomSectionThird>
                        <Text>
                            지원자 {form.applyCount}명
                        </Text>
                        <VerticalDivider/>
                        <Text>
                            스크랩 {form.scrapCount}명
                        </Text>
                        <VerticalDivider/>
                        <Text>
                            마감 {getDday(form.recruitmentEndDate)}
                        </Text>
                    </BottomSectionThird>
                </BottomCard>
            </ListCardContainer>
        </div>
    )

}