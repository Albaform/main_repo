import Image from 'next/image';
import { DetailApplicationDataProps } from '../../types';
import { calcExperienceMonths } from '@/utils/calcExperienceMonths';
import { fetchDownloadResume } from '@/lib/fetch/file';

export default function Section2({
  applicationData,
  resumeId,
  resumeName,
}: {
  applicationData: DetailApplicationDataProps;
  resumeId: number;
  resumeName: string;
}) {
  const handleResumeDownload = async () => {
    await fetchDownloadResume(resumeId, resumeName);
  };

  return (
    <div className='w-1/2 pr-[80px] pb-[150px] max-[1480px]:pr-[50px] max-lg:pr-[0] max-lg:w-full'>
      <p className='text-3xl font-semibold'>제출 내용</p>
      <div className='text-[18px] mt-[40px] mb-[48px] max-md:text-[14px]'>
        <div className='flex-[1] flex items-center justify-between pb-[14px] border-b border-solid border-line-100'>
          <p className='font-light text-black100'>이름</p>
          <p className='font-light text-black300'>{applicationData?.name}</p>
        </div>
        <div className='flex-[1] flex items-center justify-between py-[14px] border-b border-solid border-line-100'>
          <p className='font-light text-black100'>연락처</p>
          <p className='font-light text-black300'>
            {applicationData?.phoneNumber}
          </p>
        </div>
        <div className='flex-[1] flex items-center justify-between py-[14px] border-b border-solid border-line-100'>
          <p className='font-light text-black100'>경력</p>
          <p className='font-light text-black300'>
            {calcExperienceMonths(applicationData?.experienceMonths)}
          </p>
        </div>
        <div className='py-[14px]'>
          <p className='font-light text-black100'>이력서</p>
          <div className='flex items-center justify-between bg-background-200 p-[14px] rounded-[8px] font-light text-black300 mt-[14px] text-black300'>
            <p>{applicationData?.resumeName}</p>
            <Image
              src='/images/applicationDetail/iconDownload.svg'
              alt='Download'
              width={36}
              height={36}
              className='cursor-pointer'
              onClick={handleResumeDownload}
            />
          </div>
        </div>
        <div className='pt-6 max-md:pt-4'>
          <p className='font-light text-black100'>자기소개</p>
          <div className='mt-[14px] px-[14px] py-[18px] border border-solid border-gray-200 rounded-[8px] text-black300 font-light text-[16px] max-md:text-[14px]'>
            {applicationData?.introduction?.split(/\n{2,}/).map((para, i) => (
              <p key={i} className='whitespace-pre-wrap'>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
