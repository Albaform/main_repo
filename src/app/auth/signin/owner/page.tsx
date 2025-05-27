'use client';

import Link from 'next/link';
import Input from '@/app/auth/components/Input';
import Button from '@/app/auth/components/Button';
import Toast from '@/components/tooltip/Toast';
import { useEffect, useState } from 'react';
import { useSignIn } from '@/hooks/mutation/useSignIn';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInInput } from '@/schemas/signinSchema';

export default function SignIn() {
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
        router.push('/');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (error) {
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px]'
    >
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>로그인</p>
        <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
          <p>
            사장님 계정이 없으신가요?
            <Link
              href='/auth/signup/owner'
              className='inline underline ml-1 text-black'
            >
              회원가입 하기
            </Link>
          </p>
          <p>
            지원자 로그인은{' '}
            <Link
              href='/auth/signin/applicant'
              className='inline underline ml-1 text-black'
            >
              지원자 전용 페이지
            </Link>
            에서 할 수 있습니다.
          </p>
        </div>
      </div>

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
      <Button type='submit' disabled={!isValid}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>로그인되었습니다 !</Toast>
      )}
    </form>
  );
}
