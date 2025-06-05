'use client';

import Link from 'next/link';
import Input from '@/app/auth/components/Input';
import Button from '@/app/auth/components/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { SignUp2Input, signUpSchema2Base } from '@/schemas/signupSchema';
import { openKakaoAddress } from '@/utils/openKakaoAddress';

export default function SignInInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<SignUp2Input>({
    resolver: zodResolver(signUpSchema2Base),
    mode: 'onChange',
  });

  const [showToast, setShowToast] = useState(true);
  const router = useRouter();
  const { isPending, error } = useSignUp();
  const setStep1 = useSignUpStore((state) => state.setStep1);
  const setStep2 = useSignUpStore((state) => state.setStep2);

  const onSubmit = (formData: SignUp2Input) => {
    setStep2(formData);
    router.push('/');
  };

  useEffect(() => {
    if (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px]'
    >
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>사장님 정보 입력</p>
        <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
          <p>추가 정보를 입력하여 회원가입을 완료해주세요.</p>
        </div>
      </div>

      <div className='flex flex-col mt-[60px] mb-[52px]'>
        {/* 닉네임 */}
        <div className='mb-[32px]'>
          <Input
            id='nickname'
            label='닉네임'
            placeholder='닉네임을 입력해주세요'
            className={errors.nickname ? 'border-red' : ''}
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className='text-red text-sm'>{errors.nickname.message}</p>
          )}
        </div>

        {/* 가게 이름 */}
        <div className='mb-[32px]'>
          <Input
            id='storeName'
            type='text'
            label='가게 이름'
            placeholder='가게 이름(상호명)을 입력해주세요'
            className={errors.storeName ? 'border-red' : ''}
            {...register('storeName')}
          />
          {errors.storeName && (
            <p className='text-red text-sm'>{errors.storeName.message}</p>
          )}
        </div>

        {/* 가게 전화번호 */}
        <div className='mb-[32px]'>
          <Input
            id='storePhoneNumber'
            type='text'
            label='가게 전화번호'
            placeholder='숫자만 입력해주세요'
            className={errors.storePhoneNumber ? 'border-red' : ''}
            {...register('storePhoneNumber')}
          />
          {errors.storePhoneNumber && (
            <p className='text-red text-sm'>
              {errors.storePhoneNumber.message}
            </p>
          )}
        </div>

        {/* 사장님 전화번호 */}
        <div className='mb-[32px]'>
          <Input
            id='phoneNumber'
            type='text'
            label='사장님 전화번호'
            placeholder='숫자만 입력해주세요'
            className={errors.phoneNumber ? 'border-red' : ''}
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className='text-red text-sm'>{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* 가게 주소 */}
        <div className='mb-[32px]'>
          <label htmlFor='location' className='text-sm font-medium mb-1 block'>
            가게 주소
          </label>
          <div className='flex gap-2'>
            <Input
              id='location'
              label='가게 위치'
              placeholder='주소를 선택해주세요'
              readOnly
              className={`flex-1 ${errors.location ? 'border-red' : ''}`}
              {...register('location')}
            />
            <button
              type='button'
              className='border px-3 rounded text-sm text-gray-700'
              onClick={() =>
                openKakaoAddress((address) =>
                  setValue('location', address, { shouldValidate: true }),
                )
              }
            >
              주소 검색
            </button>
          </div>
          {errors.location && (
            <p className='text-red text-sm mt-1'>{errors.location.message}</p>
          )}
        </div>
      </div>

      <Button
        type='submit'
        disabled={!isValid}
        onClick={() => setShowToast(true)}
      >
        {isPending ? '정보 저장 중...' : '다음'}
      </Button>
    </form>
  );
}
