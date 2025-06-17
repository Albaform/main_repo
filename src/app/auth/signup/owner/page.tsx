'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Input from '@/app/auth/components/Input';
import Button from '@/app/auth/components/Button';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import { useSignUpStore } from '@/stores/useSignUpStore';
import {
  OwnerSignUp2Input,
  ownerSignUpSchema2Base,
} from '@/schemas/signupSchema';

export default function OwnerAuthInfoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<OwnerSignUp2Input>({
    resolver: zodResolver(ownerSignUpSchema2Base),
    mode: 'onChange',
  });

  const router = useRouter();
  const { data, setStep2, reset } = useSignUpStore.getState();
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    setValue('role', 'OWNER');
  }, [setValue]);

  const onSubmit = async (formData: OwnerSignUp2Input) => {
    try {
      setStep2(formData);

      const payload: any = {
        ...data,
        ...formData,
      };

      if (accessToken) {
        payload.provider = 'kakao';
        payload.accessToken = accessToken;
      } else {
        payload.provider = 'local';
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup/owner`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error('회원가입 실패');

      localStorage.removeItem('accessToken');
      reset();
      router.push('/signup/owner/success');
    } catch (err) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px] max-md:px-[24px]'
    >
      <p className='text-3xl font-bold text-center mb-6'>사장님 정보 입력</p>

      <Input
        id='nickname'
        label='닉네임'
        {...register('nickname')}
        placeholder='닉네임'
        className={errors.nickname ? 'border-red' : ''}
      />
      {errors.nickname && (
        <p className='text-red text-sm'>{errors.nickname.message}</p>
      )}

      <Input
        id='storeName'
        label='가게 이름'
        {...register('storeName')}
        placeholder='상호명'
        className={errors.storeName ? 'border-red' : ''}
      />
      {errors.storeName && (
        <p className='text-red text-sm'>{errors.storeName.message}</p>
      )}

      <Input
        id='storePhoneNumber'
        label='가게 전화번호'
        {...register('storePhoneNumber')}
        placeholder='숫자만 입력'
        className={errors.storePhoneNumber ? 'border-red' : ''}
      />
      {errors.storePhoneNumber && (
        <p className='text-red text-sm'>{errors.storePhoneNumber.message}</p>
      )}

      <Input
        id='phoneNumber'
        label='사장님 전화번호'
        {...register('phoneNumber')}
        placeholder='숫자만 입력'
        className={errors.phoneNumber ? 'border-red' : ''}
      />
      {errors.phoneNumber && (
        <p className='text-red text-sm'>{errors.phoneNumber.message}</p>
      )}

      <Input
        id='location'
        label='가게 위치'
        readOnly
        placeholder='주소를 선택해주세요'
        className={errors.location ? 'border-red' : ''}
        {...register('location')}
        onClick={() =>
          openKakaoAddress((addr) =>
            setValue('location', addr, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            }),
          )
        }
      />
      {errors.location && (
        <p className='text-red text-sm'>{errors.location.message}</p>
      )}

      <Button type='submit' disabled={!isValid}>
        시작하기
      </Button>
    </form>
  );
}
