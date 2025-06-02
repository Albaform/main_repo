'use client';

import StoreMap from "@/components/common/StoreMap";


export default function JobLocation() {

    return (
    <div>
        <h1 className="text-3xl font-bold pt-[16px] pb-[16px]">근무 지역</h1>
        <h2 className="text-2xl mt-[24px] mb-[48px]">
            서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층
        </h2>
        <div className="w-[770px] h-[380px] mb-[96px]">
            <StoreMap
                address="서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층"
            />
        </div>
    </div>
    )
}