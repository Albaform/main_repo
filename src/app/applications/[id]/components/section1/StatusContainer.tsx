import { DetailFormDataProps } from '@/app/albaform/[id]/types';
import { formattedDate } from '@/utils/formattedDate';
import getDday from '@/utils/getDday';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export default function StatusContainer({
  form,
  userStatus,
  role,
  setShowModal,
}: {
  form: DetailFormDataProps;
  userStatus: string;
  role: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const ownerType = role === 'OWNER';

  const handleEditStatusModal = () => {
    setShowModal(true);
  };

  return (
    <div className='border border-solid border-line-100 px-6 py-10 rounded-[8px] max-lg:mt-[40px] max-md:border-[0] max-md:bg-white max-md:mt-[0] max-md:px-0'>
      <div className='flex items-center justify-between text-[18px] pb-8 border-b border-solid border-line-100 max-md:text-[14px] max-md:pb-[14px]'>
        <div className='flex items-center'>
          <p className='text-black100 font-light mr-4'>지원일</p>
          <p className='text-orange-400 font-semibold'>
            {getDday(form?.recruitmentEndDate)}
          </p>
        </div>
        <p className='text-black300 font-light'>
          {formattedDate(form?.createdAt)}
        </p>
      </div>
      <div className='relative flex items-center justify-between text-[18px] group pt-8 max-md:text-[14px] max-md:border-b max-md:border-solid max-md:border-line-100 max-md:pb-[14px]'>
        <div className='flex items-center'>
          <p className='text-black100 font-light mr-2'>진행 상태</p>
          {ownerType && (
            <button
              type='button'
              className='text-orange-400 font-semibold'
              onClick={handleEditStatusModal}
            >
              <Image
                src='/images/applicationDetail/iconEdit.svg'
                alt='변경하기'
                width={36}
                height={36}
              />
            </button>
          )}
        </div>
        <p className='text-black300 font-light'>
          {userStatus === 'REJECTED'
            ? '거절'
            : userStatus === 'INTERVIEW_PENDING'
            ? '면접 대기'
            : userStatus === 'INTERVIEW_COMPLETED'
            ? '면접 완료'
            : userStatus === 'HIRED'
            ? '채용 완료'
            : ''}
        </p>
        {ownerType && (
          <div className='absolute left-0 bottom-[-50px] pl-3 pr-4 h-10 leading-10 rounded-[14px] bg-primary-blue300 hidden text-white text-[14px] group-hover:block'>
            <div className='flex item-center'>
              <Image
                src='/images/applicationDetail/iconInfo.svg'
                alt='!'
                width={24}
                height={24}
                className='mr-1'
              />
              <p>알바폼 현재 진행상태를 변경할 수 있어요!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
