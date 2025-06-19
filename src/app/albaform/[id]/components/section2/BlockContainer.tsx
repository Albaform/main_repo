import { DetailFormDataProps } from '../../types';
import getDday from '@/utils/getDday';
import { formattedDate } from '@/utils/formattedDate';
import { Dispatch, SetStateAction } from 'react';
import ButtonContainer from './ButtonContainer';
import { RECRUIMENT_ITMES } from '../constants/recruitmentItems';

export default function BlockContainer({
  formId,
  form,
  role,
  isLoading,
  myPost,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: {
  formId: number;
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
  return (
    <>
      <p className='text-3xl font-semibold mb-10'>모집 조건</p>
      <div className='border border-solid border-line-100 rounded-[8px] bg-background-100 p-6'>
        {RECRUIMENT_ITMES.map((item, i) => {
          return (
            <div
              key={i}
              className={`flex font-light ${
                item.condition !== '모집인원' && 'mt-4'
              }`}
            >
              <p className='flex-[1] text-black200'>{item.condition}</p>
              <p className='flex-[5] text-black400 ml-1'>
                {form && form[item.formValue as keyof DetailFormDataProps]}
              </p>
            </div>
          );
        })}
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
        <ButtonContainer
          formId={formId}
          form={form}
          myPost={myPost}
          setShowModal={setShowModal}
          setMainMessage={setMainMessage}
          setSubMessage={setSubMessage}
          setModalType={setModalType}
        />
      )}
    </>
  );
}
