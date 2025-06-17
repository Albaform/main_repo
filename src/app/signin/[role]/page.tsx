'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import Toast from '@/components/tooltip/Toast';
import { useSignIn } from '@/hooks/mutation/useSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInInput } from '@/schemas/signinSchema';
import KakaoSignIn from './OauthSignIn';

export default function SignIn({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);

  if (role !== 'applicant' && role !== 'owner') {
    notFound();
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const { mutate, isPending, error } = useSignIn(() => setShowToast(true));

  const onSubmit = (data: SignInInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, router]);

  useEffect(() => {
    if (error) {
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [error]);

  const isApplicant = role === 'applicant';

  return (
    <form
      className='max-w-[640px] mx-auto py-[200px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>로그인</p>
        {isApplicant ? (
          <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
            <p>
              아직 계정이 없으신가요?
              <Link
                href='/signup/applicant'
                className='inline underline ml-1 text-black'
              >
                회원가입 하기
              </Link>
            </p>
            <p>
              사장님 로그인은{' '}
              <Link
                href='/signin/owner'
                className='inline underline ml-1 text-black'
              >
                사장님 전용 페이지
              </Link>
              에서 할 수 있습니다.
            </p>
          </div>
        ) : (
          <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
            <p>
              사장님 계정이 없으신가요?
              <Link
                href='/signup/owner'
                className='inline underline ml-1 text-black'
              >
                회원가입 하기
              </Link>
            </p>
            <p>
              지원자 로그인은{' '}
              <Link
                href='/signin/applicant'
                className='inline underline ml-1 text-black'
              >
                지원자 전용 페이지
              </Link>
              에서 할 수 있습니다.
            </p>
          </div>
        )}
      </div>
      {isApplicant ? (
        <div className='flex flex-col mt-[60px] mb-[52px]'>
          <div className='mb-[32px]'>
            <Input
              id='email'
              label='이메일'
              placeholder='이메일을 입력하세요'
              className={errors.email ? 'border-red' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red text-sm'>{errors.email.message}</p>
            )}
          </div>
          <Input
            id='password'
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요'
            className={errors.password ? 'border-red' : ''}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red text-sm'>{errors.password.message}</p>
          )}
          {error && <p className='text-red text-sm'>{error.message}</p>}
        </div>
      ) : (
        <div className='flex flex-col mt-[60px] mb-[52px]'>
          <div className='mb-[32px]'>
            <Input
              id='email'
              label='이메일'
              placeholder='이메일을 입력해주세요'
              className={errors.email ? 'border-red' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red text-sm'>{errors.email.message}</p>
            )}
          </div>
          <Input
            id='password'
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요'
            className={errors.password ? 'border-red' : ''}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red text-sm'>{errors.password.message}</p>
          )}
        </div>
      )}
      <Button type='submit' disabled={!isValid}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>로그인되었습니다 !</Toast>
      )}
      <KakaoSignIn />
    </form>
  );
}
