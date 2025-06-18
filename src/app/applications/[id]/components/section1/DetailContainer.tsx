import { DetailFormDataProps } from '@/app/albaform/[id]/types';
import { formattedDate } from '@/utils/formattedDate';
import getRecruitStatus from '@/utils/getRecruitStatus';
import Image from 'next/image';

export default function DetailContainer({
  form,
}: {
  form: DetailFormDataProps;
}) {
  const recruitmentStatus = getRecruitStatus(
    form?.recruitmentStartDate,
    form?.recruitmentEndDate,
  );
  return (
    <>
      <div className='flex items-center mb-12 max-md:mb-6 max-md:hidden'>
        <div
          className={`h-[38px] leading-[38px] rounded-[4px] mr-2 px-3 max-md:text-[14px] ${
            form?.isPublic
              ? 'bg-orange-100 text-orange-400'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {form?.isPublic ? '공개' : '비공개'}
        </div>
        <div
          className={`h-[38px] leading-[38px] rounded-[4px] mr-4 px-3 max-md:text-[14px] ${
            recruitmentStatus === '모집 중'
              ? 'bg-orange-100 text-orange-400'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {recruitmentStatus}
        </div>
        <div className='text-gray-500 font-light text-[18px] max-md:text-[16px]'>
          {formattedDate(form?.createdAt)} 등록
        </div>
      </div>
      <div>
        <div className='flex items-center mb-4 max-md:hidden'>
          <p className='text-black-400 underline font-semibold] min-w-max mr-4 text-[24px] max-md:text-[18px]'>
            {form?.storeName}
          </p>
          <p className='text-gray-400 text-[20px] max-md:text-[16px]'>
            {form?.location.slice(0, 2)} ・ {form?.preferred}
          </p>
        </div>
        <p className='text-[32px] line-clamp-2 font-semibold mb-10 max-md:text-[20px]'>
          {form?.title}
        </p>
        <div className='border-b border-t border-solid border-line-100 px-4 py-8 max-md:hidden'>
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
            <p className='max-md:text-[14px]'>{form?.scrapCount}회</p>
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
              현재까지 {form?.applyCount}명이 알바폼에 지원했어요!
            </p>
          </div>
        </div>
      </div>
      <div className='mt-[120px] max-lg:mt-[80px] max-md:hidden'>
        {form?.description}
      </div>
    </>
  );
}
