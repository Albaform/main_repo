'use client';

import { ChangeEvent, use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/auth/Input';
import Image from 'next/image';
import Button from '@/components/auth/Button';
import Toast from '@/components/tooltip/Toast';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { useKakaoSignUpMutation } from '@/hooks/mutation/useOauth';
import { SignUpStep2Input, SignUpStep2Schema } from '@/schemas/signupSchema';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';
import { formattedStoreTel } from '@/utils/formattedStoreTel';

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
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const setStep2 = useSignUpStore((state) => state.setStep2);

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

  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get('code');
  const { mutate: kakaoSignUp, isPending: isKakaoPending } =
    useKakaoSignUpMutation({
      onSuccess: () => {
        setToastMsg('가입되었습니다');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          router.push('/');
        }, 1000);
      },
      onError: () => {
        setToastMsg('회원가입에 실패하였습니다');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      },
    });
  const {
    mutate: signUp,
    isPending: isSignUpPending,
    error,
  } = useSignUp({
    onSuccess: () => {
      setToastMsg('가입되었습니다');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/');
      }, 1000);
    },
    onError: (error: any) => {
      const serverMsg =
        error?.response?.data?.message ||
        error?.message ||
        '회원가입에 실패하였습니다';

      setToastMsg(serverMsg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      console.error(error);
    },
  });

  // 기존 로직 그대로 유지!
  const onSubmit = (formData: SignUpStep2Input) => {
    setStep2(formData);
    const step1 = useSignUpStore.getState().step1;

    if (kakaoCode) {
      kakaoSignUp({
        location: formData.location ?? '',
        phoneNumber: formData.phoneNumber ?? '',
        storePhoneNumber: formData.storePhoneNumber ?? '',
        storeName: formData.storeName ?? '',
        role: role.toUpperCase(),
        nickname: formData.nickname ?? '',
        name: formData.name ?? '',
        redirectUri: window.location.origin + `/oauth/signup/kakao/${role}`,
        token: kakaoCode,
      });
    } else {
      // signUp: step1의 email, password, role이 없으면 토스트만 띄우고 종료
      if (!step1?.email || !step1?.password || !step1?.role) {
        setToastMsg(
          '1단계 정보가 유실되었습니다. 처음부터 다시 시도해 주세요.',
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      const requestBody = {
        email: step1.email,
        password: step1.password,
        name: formData.name ?? '',
        nickname: formData.nickname ?? '',
        role: step1.role,
        storeName: formData.storeName ?? '',
        storePhoneNumber: formData.storePhoneNumber ?? '',
        phoneNumber: formData.phoneNumber ?? '',
        location: formData.location ?? '',
      };

      // 실제 보내는 데이터 shape를 반드시 콘솔에서 확인
      console.log('전송 데이터:', requestBody);
      signUp(requestBody);
    }
  };

  // 5. 추가 에러 처리
  // useEffect(() => {
  //   if (error) {
  //     alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
  //   }
  // }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px] max-md:mx-6'
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
                {...register('phoneNumber', {
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    const formatted = formattedPhoneNumber(onlyNums);
                    setValue('phoneNumber', formatted, {
                      shouldValidate: true,
                    });
                  },
                })}
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
              {...register('storePhoneNumber', {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  const formatted = formattedStoreTel(onlyNums);
                  setValue('storePhoneNumber', formatted, {
                    shouldValidate: true,
                  });
                },
              })}
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
              {...register('phoneNumber', {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  const formatted = formattedPhoneNumber(onlyNums);
                  setValue('phoneNumber', formatted, {
                    shouldValidate: true,
                  });
                },
              })}
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
              style={{ cursor: 'pointer' }}
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
        {isSignUpPending || isKakaoPending ? '정보 저장 중...' : '시작하기'}
        {showToast && (
          <Toast onClose={() => setShowToast(false)}>{toastMsg}</Toast>
        )}
      </Button>
    </form>
  );
}
