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
import getRecruitStatus from '@/utils/getRecruitStatus';
import getDday from "@/utils/getDday";

interface ListCardProps {
    form: FormData; 
  }
  

export default function ListCard({ form }: ListCardProps){

    const [imgSrc, setImgSrc] = useState(form.imageUrls[0] || '/images/image 7.png');
    const kebabIcon = '/images/albaformList/kebab-menu.png';


    //fallback이미지
    const handleError = () => {
        setImgSrc('/images/albaformList/image 7.png'); // fallback 이미지
      };

    
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

                        {getDday(form.recruitmentEndDate)}

                        </Text>
                    </BottomSectionThird>
                </BottomCard>
            </ListCardContainer>
        </div>
    )

}