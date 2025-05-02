'use client';

import { BannerImg, BottomCard, BottomSectionFirst, BottomSectionSecond, BottomSectionThird, Dates, Kebab, ListCardContainer, Tag, Text,VerticalDivider } from "../styles";
import Image from "next/image";


export default function ListCard(){
    const bannerImg = '/images/albaformList/image 7.png';
    const kebabIcon = '/images/albaformList/kebab-menu.png';

    return(

        <div>
            <ListCardContainer>
                <BannerImg>
                    <Image src={bannerImg} alt="bannerImg" width={477} height={304} />
                </BannerImg>
                <BottomCard>
                    <BottomSectionFirst>
                        <Tag>
                            공개
                        </Tag>
                        <Tag>
                            모집중
                        </Tag>
                        <Dates>
                            2024.05.20 ~ 2025.05.20
                        </Dates>
                        <Kebab>
                            <Image src={kebabIcon} alt="kebabIcon" width={36} height={36} />
                        </Kebab>
                    </BottomSectionFirst>
                    <BottomSectionSecond>
                        코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구 서대문
                    </BottomSectionSecond>
                    <BottomSectionThird>
                        <Text>
                            지원자 5명
                        </Text>
                        <VerticalDivider/>
                        <Text>
                            스크랩 8명
                        </Text>
                        <VerticalDivider/>
                        <Text>
                            마감 D-10
                        </Text>
                    </BottomSectionThird>
                </BottomCard>
            </ListCardContainer>
        </div>
    )

}