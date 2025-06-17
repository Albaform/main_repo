'use client';

import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/auth/Input';
import Button from '@/components/auth/Button';
import Toast from '@/components/tooltip/Toast';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { SignUpStep2Input, SignUpStep2Schema } from '@/schemas/signupSchema';
import instance from '@/lib/api/api';

export default function SignUpInfo({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);
  if (role !== 'applicant' && role !== 'owner') {
    notFound();
  }
  const isApplicant = role === 'applicant';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<SignUpStep2Input>({
    resolver: zodResolver(SignUpStep2Schema),
    mode: 'onChange',
    defaultValues: {
      role: role.toUpperCase() as 'OWNER' | 'APPLICANT',
    },
  });

  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const { data, isPending, error, reset } = useSignUp();
  const setStep2 = useSignUpStore((state) => state.setStep2);
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const onSubmit = async (formData: SignUpStep2Input) => {
    try {
      const step1 = useSignUpStore.getState().step1;
      setStep2(formData);

      const payload: Record<string, any> = {
        email: step1?.email ?? '',
        password: step1?.password ?? '',
        name: formData.name ?? '',
        nickname: formData.nickname ?? '',
        role: step1?.role ?? formData.role ?? '',
        storeName: formData.storeName ?? '',
        storePhoneNumber: formData.storePhoneNumber ?? '',
        phoneNumber: formData.phoneNumber ?? '',
        location: formData.location ?? '',
      };

      console.log('전송 payload:', payload);
      await instance.post(`/auth/sign-up`, payload);

      setToastMsg('가입되었습니다');
      setShowToast(true);

      // 토스트 띄운 후 2초 있다가 이동, 혹은 즉시 이동할 수도 있음
      setTimeout(() => {
        setShowToast(false);
        router.push(`/`);
      }, 2000);
    } catch (error) {
      setToastMsg('회원가입에 실패하였습니다');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
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
        <p className='font-semibold text-3xl mb-[32px]'>
          {isApplicant ? '지원자 정보 입력' : '사장님 정보 입력'}
        </p>
        <p className='text-[20px] text-black100 text-center'>
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </p>
      </div>
      <div className='flex flex-col mt-[60px] mb-[52px] gap-8'>
        {isApplicant ? (
          <>
            <div className='flex justify-center'>
              <Image
                src='/images/mypage/editProfileImg.svg'
                alt='profile image'
                width={100}
                height={100}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                id='name'
                label='이름'
                placeholder='이름을 입력해주세요'
                className={errors.name ? 'border-red' : ''}
                {...register('name')}
              />
              {errors.name && (
                <p className='text-red text-sm mt-2 text-right'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id='phoneNumber'
                label='연락처'
                placeholder='숫자만 입력해주세요'
                className={errors.phoneNumber ? 'border-red' : ''}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className='text-red text-sm'>{errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
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
          </>
        ) : (
          <>
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
            <Input
              id='name'
              label='이름'
              placeholder='이름을 입력해주세요'
              className={errors.name ? 'border-red' : ''}
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red text-sm'>{errors.name.message}</p>
            )}
            <Input
              id='storeName'
              label='가게 이름'
              placeholder='가게 이름(상호명)을 입력해주세요'
              className={errors.storeName ? 'border-red' : ''}
              {...register('storeName')}
            />
            {errors.storeName && (
              <p className='text-red text-sm'>{errors.storeName.message}</p>
            )}

            <Input
              id='storePhoneNumber'
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

            <Input
              id='phoneNumber'
              label='사장님 전화번호'
              placeholder='숫자만 입력해주세요'
              className={errors.phoneNumber ? 'border-red' : ''}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className='text-red text-sm'>{errors.phoneNumber.message}</p>
            )}

            <Input
              id='location'
              label='가게 위치'
              placeholder='주소를 선택해주세요'
              readOnly
              className={errors.location ? 'border-red' : ''}
              {...register('location')}
              onClick={() =>
                openKakaoAddress((address) =>
                  setValue('location', address, {
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
          </>
        )}
      </div>

      <Button
        type='submit'
        disabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isPending ? '정보 저장 중...' : '시작하기'}
        {showToast && (
          <Toast onClose={() => setShowToast(false)}>{toastMsg}</Toast>
        )}
      </Button>
    </form>
  );
}
