import getRecruitStatus from '@/utils/getRecruitStatus';
import { SetStateAction } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';
import { DetailFormDataProps } from '../../types';

export default function ButtonContainer({
  formId,
  form,
  myPost,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: {
  formId: number;
  form: DetailFormDataProps;
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

  const recruitmentDeadline =
    getRecruitStatus(form?.recruitmentStartDate, form?.recruitmentEndDate) ===
    '모집 마감';

  return (
    <div
      className={`mt-[46px] left-[0] right-[0] bottom-[0] rounded-t-lg border-t border-solid border-line-200 max-lg:fixed max-lg:bg-white max-lg:pt-[20px] max-lg:px-6 max-lg:pb-[calc(30px+theme(spacing.safe-bottom))] z-[10] ${
        myPost && 'max-lg:flex max-lg:flex-row-reverse'
      }`}
    >
      <button
        type='button'
        className={`flex items-center w-full h-[68px] rounded-[8px] justify-center text-white font-semibold ${
          recruitmentDeadline ? 'bg-gray-400' : 'bg-orange-400'
        }`}
        disabled={recruitmentDeadline}
        onClick={() => {
          router.push(
            myPost
              ? `/editAlbaform/owner/${formId}`
              : `/createAlbaform/applicant?formId=${formId}`,
          );
        }}
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
          className={`mr-1 ${recruitmentDeadline && 'hidden'}`}
        />
        {myPost ? '수정하기' : recruitmentDeadline ? '모집 마감' : '지원하기'}
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
  );
}
