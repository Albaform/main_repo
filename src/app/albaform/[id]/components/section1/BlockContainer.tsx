import Image from 'next/image';
import { DetailFormDataProps } from '../../types';
import { formattedDate } from '@/utils/formattedDate';

export default function BlockContainer({
  form,
}: {
  form: DetailFormDataProps;
}) {
  const workDaysString =
    Array.isArray(form?.workDays) && form?.workDays.length > 0
      ? form?.workDays.join(', ')
      : '없음';

  return (
    <div className='flex-[1] max-lg:mt-8'>
      <div className='flex flex-wrap bg-background-100 rounded-[8px] border border-solid border-line-100 max-lg:gap-x-[2%] max-lg:border-[0] max-lg:bg-white'>
        <div className='p-[30px] flex flex-[1] min-w-[49%] min-h-[calc(100vw_*_(140/1920))] border-r border-solid border-line-200 max-lg:border max-lg:max-w-[49%] max-lg:items-center max-lg:rounded-[8px] max-lg:px-3 max-lg:py-2'>
          <div className='min-w-14 w-14 h-14 rounded-full bg-line-100 content-center justify-items-center mr-6 max-lg:min-w-9 max-lg:w-9 max-lg:h-9 max-lg:mr-2'>
            <div className='relative w-9 h-9 max-lg:w-6 max-lg:h-6'>
              <Image
                src='/images/albaformDetail/iconCoins.svg'
                alt='코인'
                fill
              />
            </div>
          </div>
          <div>
            <p className='text-[20px] text-black100 font-light max-lg:text-[14px]'>
              시급
            </p>
            <p className='text-[20px] text-orange-400 font-semibold max-lg:text-[14px]'>
              {form?.hourlyWage?.toLocaleString()}원
            </p>
          </div>
        </div>

        <div className='p-[30px] flex flex-[1] min-w-[49%] min-h-[calc(100vw_*_(140/1920))] border-solid border-line-200 max-lg:border max-lg:max-w-[49%] max-lg:items-center max-lg:rounded-[8px] max-lg:px-3 max-lg:py-2'>
          <div className='min-w-14 w-14 h-14 rounded-full bg-line-100 content-center justify-items-center mr-6 max-lg:min-w-9 max-lg:w-9 max-lg:h-9 max-lg:mr-2'>
            <div className='relative w-9 h-9 max-lg:w-6 max-lg:h-6'>
              <Image
                src='/images/albaformDetail/iconCalendarClock.svg'
                alt='코인달력'
                fill
              />
            </div>
          </div>
          <div>
            <p className='text-[20px] text-black100 font-light max-lg:text-[14px]'>
              기간
            </p>
            <p className='text-[20px] text-orange-400 font-semibold max-lg:text-[14px]'>
              {formattedDate(form?.workStartDate)} ~{' '}
              {formattedDate(form?.workEndDate)}
            </p>
          </div>
        </div>

        <div className='p-[30px] flex flex-[1] min-w-[49%] min-h-[calc(100vw_*_(140/1920))] border-r border-solid border-line-200 border-t max-lg:border max-lg:max-w-[49%] max-lg:items-center max-lg:rounded-[8px] max-lg:mt-[10px] max-lg:px-3 max-lg:py-2'>
          <div className='min-w-14 w-14 h-14 rounded-full bg-line-100 content-center justify-items-center mr-6 max-lg:min-w-9 max-lg:w-9 max-lg:h-9 max-lg:mr-2'>
            <div className='relative w-9 h-9 max-lg:w-6 max-lg:h-6'>
              <Image
                src='/images/albaformDetail/iconCalendar.svg'
                alt='달력'
                fill
              />
            </div>
          </div>
          <div>
            <p className='text-[20px] text-black100 font-light max-lg:text-[14px]'>
              요일
            </p>
            <p className='text-[20px] text-orange-400 font-semibold max-lg:text-[14px]'>
              {workDaysString}
            </p>
          </div>
        </div>

        <div className='p-[30px] flex flex-[1] min-w-[49%] min-h-[calc(100vw_*_(140/1920))] border-t border-solid border-line-200 max-lg:border max-lg:max-w-[49%] max-lg:items-center max-lg:rounded-[8px] max-lg:mt-[10px] max-lg:px-3 max-lg:py-2'>
          <div className='min-w-14 w-14 h-14 rounded-full bg-line-100 content-center justify-items-center mr-6 max-lg:min-w-9 max-lg:w-9 max-lg:h-9 max-lg:mr-2'>
            <div className='relative w-9 h-9 max-lg:w-6 max-lg:h-6'>
              <Image
                src='/images/albaformDetail/iconClock.svg'
                alt='시간'
                fill
              />
            </div>
          </div>
          <div>
            <p className='text-[20px] text-black100 font-light max-lg:text-[14px]'>
              시간
            </p>
            <p className='text-[20px] text-orange-400 font-semibold max-lg:text-[14px]'>
              {form?.workStartTime} ~ {form?.workEndTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
