'use client';

import { Dates, Tag } from "../styles";


export default function Title(){

    const scrapicon = '/images/Rectangle 1136.png';
    const applicationstatus = '/images/uesr.png';


    return(

    <div className="flex flex-col w-[770px] h-[432px]">
        <div className="mb-[48px] items-center flex" >

            <Tag>
                공개
            </Tag>
            <Tag>
                모집 중
            </Tag>
            <Dates>
                2024.05.04 12:30:54 등록
            </Dates>
        </div>
        <div className="mb-[16px] items-center" >
            <span className="text-[24px] underline font-semibold mr-[16px]">코드잇</span>
            <span className="text-[20px] text-gray-400">서울 종로구 · 경력 무관</span>
        </div>

        <div className="mb-[10px] items-center">
            <span className="text-[32px] font-semibold">코드잇 스터디카페 관리 (주말 오전) 모집합니다. 서울 종로구 용산구 서대문</span>
        </div>
        <div className="border-t border-b border-gray-50 max-w-[770px] max-h-[152px] ">
            <div className="flex items-center">

                <img className="pt-[8px] pb-[8px] pr-[8px] pl-[8px] mr-[8px]" src={scrapicon} />
                <span className="text-[18px] font-semibold mr-[37px]">스크랩</span>
                <span className="text-[18px] font-semibold text-black-200">8 회</span>
            </div>

            <div className="flex items-center">
                <img className="pt-[8px] pb-[8px] pr-[4px] "src={applicationstatus} />
                <span className="text-[18px] font-semibold mr-[18px]">지원현황</span>

                <span className="text-[18px] font-semibold text-black-200">현재까지 <span className="text-black-400">5명이</span> 알바폼에 지원했어요!</span>
            </div>
        </div>
    </div>
    )

}
