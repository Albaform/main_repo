import Image from 'next/image';

export default function TextContainer() {
  return (
    <div className='flex flex-col flex-[1]'>
      <div className='flex items-center mb-12 max-md:mb-6'>
        <div className='h-[38px] leading-[38px] rounded-[4px] mr-2 px-3 bg-orange-100 text-orange-400 max-md:text-[14px]'>
          공개
        </div>
        <div className='h-[38px] leading-[38px] rounded-[4px] mr-4 px-3 bg-orange-100 text-orange-400 max-md:text-[14px]'>
          모집중
        </div>
        <div className='text-gray-500 font-light text-[18px] max-md:text-[16px]'>
          2024. 05. 04 12:30:54 등록
        </div>
      </div>
      <div>
        <div className='flex items-center mb-4'>
          <p className='text-black-400 underline font-semibold mr-4 text-[24px] max-md:text-[18px]'>
            코드잇
          </p>
          <p className='text-gray-400 text-[20px] max-md:text-[16px]'>
            서울 종로구 ・ 경력 무관
          </p>
        </div>
        <p className='text-[32px] line-clamp-2 font-semibold mb-10 max-md:text-[20px]'>
          코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구
          서대문코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구
          서대문코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구
          서대문
        </p>
        <div className='border-b border-t border-solid border-line-100 px-4 py-8'>
          <div className='flex items-center'>
            <Image
              src='/images/albaformDetail/iconScrap.svg'
              alt='스크랩'
              width={36}
              height={36}
            />
            <p className='min-w-[100px] ml-2 text-[18px] font-semibold text-black400 max-md:text-[14px]'>
              스크랩
            </p>
            <p className='max-md:text-[14px]'>8회</p>
          </div>
          <div className='flex items-center'>
            <Image
              src='/images/albaformDetail/iconUser.svg'
              alt='유저'
              width={36}
              height={36}
            />
            <p className='min-w-[100px] ml-2 text-[18px] font-semibold text-black400 max-md:text-[14px]'>
              지원현황
            </p>
            <p className='max-md:text-[14px]'>
              현재까지 5명이 알바폼에 지원했어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
