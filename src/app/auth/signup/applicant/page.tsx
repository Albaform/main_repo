'use client';

import Link from 'next/link';
import Input from '@/app/auth/components/Input';
import Button from '@/app/auth/components/Button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { signUpSchema1, SignUp1Input } from '@/schemas/signupSchema';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUp1Input>({
    resolver: zodResolver(signUpSchema1),
    mode: 'onChange',
  });
  const router = useRouter();
  const { isPending, error } = useSignUp();
  const setStep1 = useSignUpStore((state) => state.setStep1);

  const onSubmit = (formData: SignUp1Input) => {
    const { confirmPassword, ...step1Data } = formData;
    setStep1(step1Data);
    router.push(`/signup/owner/authinfo`);
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
        <p className='font-semibold text-3xl mb-[32px]'>회원가입</p>
        <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
          <p>
            이미 계정이 있으신가요?
            <Link
              href='/auth/signin/applicant'
              className='inline underline ml-1 text-black'
            >
              로그인 하기
            </Link>
          </p>
          <p>
            사장님 회원가입은{' '}
            <Link
              href='/auth/signup/owner'
              className='inline underline ml-1 text-black'
            >
              사장님 전용 페이지
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
        <div className='mb-[32px]'>
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
        <div>
          <Input
            id='confirmPassword'
            type='password'
            label='비밀번호확인'
            placeholder='비밀번호를 한번 더 입력해주세요'
            className={errors.password ? 'border-red' : ''}
            {...register('confirmPassword')}
          />
        </div>
        {errors.confirmPassword && (
          <p className='text-red text-sm'>{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type='submit' disabled={!isValid}>
        {isPending ? '정보 저장 중...' : '다음'}
      </Button>
      <p className='flex items-center justify-center text-[16px] text-black100 my-[20px]'>
        가입시{' '}
        <Link
          href='/auth/signup/applicant'
          target='_blank'
          rel='noopener noreferrer'
          className='inline underline ml-1 text-primary-orange300'
        >
          이용약관
        </Link>
        에 동의한 것으로 간주됩니다.
      </p>
    </form>
  );
}
