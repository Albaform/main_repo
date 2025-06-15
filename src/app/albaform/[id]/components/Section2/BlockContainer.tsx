import Image from 'next/image';
import { DetailFormDataProps } from '../../types';
import getDday from '@/utils/getDday';
import { formattedDate } from '@/utils/formattedDate';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

export default function BlockContainer({
  form,
  role,
  isLoading,
  myPost,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: {
  form: DetailFormDataProps;
  role: 'OWNER' | 'APPLICANT';
  isLoading: boolean;
  myPost: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<
    SetStateAction<
      | 'editUser'
      | 'editPassword'
      | 'deletePost'
      | 'deleteComment'
      | 'cancelScrap'
      | 'deleteForms'
    >
  >;
}) {
  const router = useRouter();

  const handleDeleteOpenModal = () => {
    setShowModal(true);
    setModalType('deleteForms');
    setMainMessage('선택하신 알바폼을 삭제할까요?');
    setSubMessage('삭제 후 정보를 복구할 수 없어요.');
  };

  return (
    <>
      <p className='text-3xl font-semibold mb-10'>모집 조건</p>
      <div className='border border-solid border-line-100 rounded-[8px] bg-background-100 p-6'>
        <div className='flex font-light'>
          <p className='flex-[1] text-black200'>모집인원</p>
          <p className='flex-[5] text-black400 ml-1'>
            {form?.numberOfPositions}명
          </p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>성별</p>
          <p className='flex-[5] text-black400 ml-1'>{form?.gender}</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>학력</p>
          <p className='flex-[5] text-black400 ml-1'>{form?.education}</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>연령</p>
          <p className='flex-[5] text-black400 ml-1'>{form?.age}</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>우대사항</p>
          <p className='flex-[5] text-black400 ml-1'>{form?.preferred}</p>
        </div>
      </div>
      <div className='border border-solid border-line-100 rounded-[8px] bg-background-100 p-6 mt-6'>
        <div className='flex justify-between font-light'>
          <p className='text-black200'>
            모집기간
            <span className='text-orange-400 font-semibold ml-2'>
              {getDday(form?.recruitmentEndDate)}
            </span>
          </p>
          <p className='text-black400 ml-1'>
            {formattedDate(form?.recruitmentStartDate)} ~{' '}
            {formattedDate(form?.recruitmentEndDate)}
          </p>
        </div>
        <div className='flex justify-between font-light mt-4'>
          <p className='text-black200'>가게 전화번호</p>
          <p className='text-black400 ml-1'>{form?.storePhoneNumber}</p>
        </div>
        <div className='flex justify-between font-light mt-4'>
          <p className='text-black200'>사장님 전화번호</p>
          <p className='text-black400 ml-1'>{form?.phoneNumber}</p>
        </div>
      </div>
      {((!isLoading && role === 'APPLICANT') || (!isLoading && myPost)) && (
        <div
          className={`mt-[46px] left-[0] right-[0] bottom-[0] rounded-t-lg border-t border-solid border-line-200 max-lg:fixed max-lg:bg-white max-lg:pt-[20px] max-lg:px-6 max-lg:pb-[calc(30px+theme(spacing.safe-bottom))] z-[10] ${
            myPost && 'max-lg:flex max-lg:flex-row-reverse'
          }`}
        >
          <button
            type='button'
            className='flex items-center w-full h-[68px] bg-orange-400 rounded-[8px] justify-center text-white font-semibold'
          >
            <Image
              src={
                myPost
                  ? '/images/albaformDetail/buttonEdit.svg'
                  : '/images/albaformDetail/buttonWriting.svg'
              }
              alt='지원하기'
              width={24}
              height={24}
              className='mr-1'
            />
            {myPost ? '수정하기' : '지원하기'}
          </button>
          <button
            type='button'
            className={`flex items-center w-full h-[68px] border border-solid font-semibold rounded-[8px] mt-4 justify-center ${
              myPost
                ? 'border-[0] bg-line-200 text-gray-400 max-lg:mt-[0] max-lg:mr-2 max-lg:max-w-[70px]'
                : 'border-orange-400 text-orange-400'
            }`}
            onClick={() =>
              myPost
                ? handleDeleteOpenModal()
                : router.push('/myAlbaform/applicant')
            }
          >
            <Image
              src={
                myPost
                  ? '/images/albaformDetail/buttonTrash.svg'
                  : '/images/albaformDetail/buttonApplyList.svg'
              }
              alt='내역보기'
              width={24}
              height={24}
              className='mr-1'
            />
            <p className={`${myPost && 'max-lg:hidden'}`}>
              {myPost ? '삭제하기' : '내 지원 내역 보기'}
            </p>
          </button>
        </div>
      )}
    </>
  );
}
