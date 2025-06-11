import useFormChangeDetector from '@/app/mypage/hooks/useInfoChangeDetector';
import useInitializeUserForm from '@/app/mypage/hooks/useInitializeInfoForm';
import { EditProfileFormProps } from '@/app/mypage/types';
import Address from '@/components/controller/Address';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';

export default function EditProfileForm(props: EditProfileFormProps) {
  const {
    form,
    pathOwner,
    user,
    onSubmit,
    isPending,
    isPreview,
    setIsPreview,
    handleImgChange,
    setSelectedImageFile,
    handleCloseModal,
  } = props;

  const { handleSubmit, trigger, register, formState, control } = form;
  const { isValid, errors } = formState;

  const { setValue, watch, selectedImageFile } = form;
  const watched = watch();

  useInitializeUserForm({ user, setValue });

  const { isModified: isFormModified } = useFormChangeDetector({
    watched,
    setValue,
    user,
  });

  const isModified = isFormModified || !!selectedImageFile;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        disabled={isPending}
        className={`${isPending ? 'pointer-events-none' : ''}`}
      >
        <div className='relative inline-block'>
          <label className='inline-block justify-items-center mt-[24px] mb-[24px] cursor-pointer'>
            <Image
              src={`${
                isPreview?.length > 0
                  ? isPreview
                  : '/images/mypage/editProfileImg.svg'
              }`}
              alt='기본 이미지'
              width={80}
              height={80}
              className='rounded-[50%] overflow-hidden object-cover max-h-[80px] min-h-[80px]'
            />
            <Image
              src='/images/mypage/iconEditImg.svg'
              alt='이미지 수정'
              width={24}
              height={24}
              className='absolute right-[0] bottom-[28px]'
            />
            <input
              type='file'
              accept='image/png, image/jpg'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                handleImgChange(e);
                setSelectedImageFile(file!);
                setValue('imageUrl', file ? file.name : '', {
                  shouldDirty: true,
                });
                trigger('imageUrl');
              }}
            />
          </label>
          {isPreview?.length > 0 && (
            <Image
              src='/images/closePreview.svg'
              alt='X'
              width={24}
              height={24}
              className='absolute z-[100] top-[24px] left-[0] cursor-pointer'
              onClick={() => {
                setIsPreview('');
                setSelectedImageFile(null);
                setValue('imageUrl', '', {
                  shouldDirty: true,
                });
                trigger('imageUrl');
              }}
            />
          )}
        </div>
        {!pathOwner && (
          <div className='text-left mb-[15px]'>
            <label htmlFor='name' className='inline-block mb-[10px]'>
              이름 <span className='text-orange-300 relative top-[1px]'>*</span>
            </label>
            <input
              id='name'
              type='text'
              {...register('name')}
              placeholder='이름을 입력해주세요'
              className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
            />
            {errors.name && (
              <p className='text-left mt-[10px] text-red'>
                {errors.name.message}
              </p>
            )}
          </div>
        )}
        <div className='text-left'>
          <label htmlFor='nickname' className='inline-block mb-[10px]'>
            닉네임 <span className='text-orange-300 relative top-[1px]'>*</span>
          </label>
          <input
            id='nickname'
            type='text'
            {...register('nickname')}
            placeholder='닉네임을 입력해주세요'
            className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
          />
          {errors.nickname && (
            <p className='text-left mt-[10px] text-red'>
              {errors.nickname.message}
            </p>
          )}
        </div>
        {pathOwner && (
          <>
            <div className='text-left mt-[15px] '>
              <label htmlFor='store' className='inline-block mb-[10px]'>
                가게 이름{' '}
                <span className='text-orange-300 relative top-[1px]'>*</span>
              </label>
              <input
                id='store'
                type='text'
                {...register('store')}
                placeholder='가게 이름(상호명)을 입력해주세요'
                className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
              />
              {errors.store && (
                <p className='text-left mt-[10px] text-red'>
                  {errors.store.message}
                </p>
              )}
            </div>
            <div className='text-left'>
              <label
                htmlFor='storeTel'
                className='inline-block mt-[15px] mb-[10px]'
              >
                가게 전화번호{' '}
                <span className='text-orange-300 relative top-[1px]'>*</span>
              </label>
              <input
                id='storeTel'
                type='tel'
                inputMode='numeric'
                {...register('storeTel', {
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    const formatted = formattedStoreTel(onlyNums);
                    setValue('storeTel', formatted, { shouldValidate: true });
                  },
                })}
                placeholder='가게 전화번호를 입력해주세요'
                className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
              />
              {errors.storeTel && (
                <p className='text-left mt-[10px] text-red'>
                  {errors.storeTel.message}
                </p>
              )}
            </div>
          </>
        )}
        <div className='text-left'>
          <label
            htmlFor='phoneNumber'
            className='inline-block mt-[15px] mb-[10px]'
          >
            {pathOwner ? '사장님 전화번호' : '연락처'}
            {!pathOwner && (
              <span className='text-orange-300 relative top-[1px]'> *</span>
            )}
          </label>
          <input
            id='phoneNumber'
            type='tel'
            inputMode='numeric'
            {...register('phoneNumber', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                const formatted = formattedPhoneNumber(onlyNums);
                setValue('phoneNumber', formatted, {
                  shouldValidate: true,
                });
              },
            })}
            placeholder='사장님 전화번호를 입력해주세요'
            className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
          />
          {!pathOwner && errors.phoneNumber && (
            <p className='text-left mt-[10px] text-red'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        {pathOwner && (
          <div>
            <p className='text-left mt-[15px] mb-[10px]'>
              가게 위치{' '}
              <span className='text-orange-300 relative top-[1px]'>*</span>
            </p>
            <Address editInfoControl={control} disabled={isPending} />
            {errors.address && (
              <p className='text-left mt-[10px] text-red'>
                {errors.address.message}
              </p>
            )}
          </div>
        )}
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
            disabled={!isValid || !isModified || isPending}
          >
            수정하기
          </button>
        </div>
      </fieldset>
    </form>
  );
}
