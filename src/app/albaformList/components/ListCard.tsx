'use client';

import { BannerImg, BottomCard, BottomSectionFirst, ListCardContainer, Tag } from "../styles";
import Image from "next/image";


export default function ListCard(){
    const bannerImg = '/images/albaformList/image7.png';

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
                    </BottomSectionFirst>
                </BottomCard>
            </ListCardContainer>
        </div>
    )

}