import Image from 'next/image';
import { EditPasswordFormProps } from '@/app/mypage/types';
import { useState } from 'react';
import usePasswordChangeDetector from '@/app/mypage/hooks/usePasswordChangeDetector';

export default function EditPasswordForm(props: EditPasswordFormProps) {
  const { form, onSubmit, isPending, handleCloseModal } = props;

  const { handleSubmit, register, formState } = form;
  const { errors } = formState;

  const [visibleFields, setVisibleFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleFieldVisibility = (field: 'current' | 'new' | 'confirm') => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { watch } = form;
  const watched = watch();

  const { isModified } = usePasswordChangeDetector(watched);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={`${isPending ? 'pointer-events-none' : ''}`}>
        <div className='text-left'>
          <label htmlFor='currentPassword' className='inline-block mb-[10px]'>
            현재 비밀번호
          </label>
          <div
            className={`flex px-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400 ${
              isPending && 'bg-[#fafafa]'
            }`}
          >
            <input
              id='currentPassword'
              type={visibleFields.current ? 'text' : 'password'}
              {...register('currentPassword')}
              placeholder='현재 비밀번호를 입력해주세요'
              className={`py-[14px] flex-[2] mr-[10px] ${
                isPending && 'bg-[#fafafa]'
              }`}
            />
            <Image
              src={
                visibleFields.current
                  ? '/images/visibility_on.svg'
                  : '/images/visibility_off.svg'
              }
              alt='비밀번호 보기'
              width={24}
              height={24}
              className='cursor-pointer'
              onClick={() => toggleFieldVisibility('current')}
            />
          </div>
          {errors.currentPassword && (
            <p className='text-left mt-[10px] text-red'>
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className='text-left'>
          <label
            htmlFor='currentPassword'
            className='inline-block mt-[15px] mb-[10px]'
          >
            새 비밀번호
          </label>
          <div
            className={`flex px-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400 ${
              isPending && 'bg-[#fafafa]'
            }`}
          >
            <input
              id='currentPassword'
              type={visibleFields.new ? 'text' : 'password'}
              {...register('newPassword')}
              placeholder='새로운 비밀번호를 입력해주세요'
              className={`py-[14px] flex-[2] mr-[10px] ${
                isPending && 'bg-[#fafafa]'
              }`}
            />
            <Image
              src={
                visibleFields.new
                  ? '/images/visibility_on.svg'
                  : '/images/visibility_off.svg'
              }
              alt='비밀번호 보기'
              width={24}
              height={24}
              className='cursor-pointer'
              onClick={() => toggleFieldVisibility('new')}
            />
          </div>
          {errors.newPassword && (
            <p className='text-left mt-[10px] text-red'>
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className='text-left'>
          <label
            htmlFor='currentPassword'
            className='inline-block mt-[15px] mb-[10px]'
          >
            새 비밀번호 확인
          </label>
          <div
            className={`flex px-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400 ${
              isPending && 'bg-[#fafafa]'
            }`}
          >
            <input
              id='currentPassword'
              type={visibleFields.confirm ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder='새로운 비밀번호를 다시 한번 입력해주세요'
              className={`py-[14px] flex-[2] mr-[10px] ${
                isPending && 'bg-[#fafafa]'
              }`}
            />
            <Image
              src={
                visibleFields.confirm
                  ? '/images/visibility_on.svg'
                  : '/images/visibility_off.svg'
              }
              alt='비밀번호 보기'
              width={24}
              height={24}
              className='cursor-pointer'
              onClick={() => toggleFieldVisibility('confirm')}
            />
          </div>
          {errors.confirmPassword && (
            <p className='text-left mt-[10px] text-red'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className='flex items-center justify-center mt-[24px]'>
          <button
            type='button'
            onClick={handleCloseModal}
            className='mr-[10px] flex-[1] pt-[20px] pb-[20px] text-white bg-gray-200 rounded-[8px]'
          >
            취소
          </button>
          <button
            type='submit'
            className='flex-[1] pt-[20px] pb-[20px] text-white bg-primary-orange300 rounded-[8px] disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={!isModified || isPending}
          >
            변경하기
          </button>
        </div>
      </fieldset>
    </form>
  );
}
