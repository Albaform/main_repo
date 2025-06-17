'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import KakaoSignUp from './OauthSignUp';
import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import { useSignUpStore } from '@/stores/useSignUpStore';
import { SignUpStep1Input, SignUpStep1Schema } from '@/schemas/signupSchema';

export default function SignUp({
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
    setValue,
  } = useForm<SignUpStep1Input>({
    resolver: zodResolver(SignUpStep1Schema),
    mode: 'onChange',
  });

  const router = useRouter();
  const { isPending, error } = useSignUp();
  const setStep1 = useSignUpStore((s) => s.setStep1);

  useEffect(() => {
    setValue('role', role.toUpperCase() as 'OWNER' | 'APPLICANT');
  }, [setValue, role]);

  const onSubmit = async (formData: SignUpStep1Input) => {
    try {
      setStep1(formData);
      console.log(formData);
      router.push(`/signup/info/${role}`);
    } catch (error) {
      console.error(error);
    }
  };

  const isApplicant = role === 'applicant';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px]'
    >
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>회원가입</p>
        {/* 상단 안내 문구 */}
        {isApplicant ? (
          <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
            <p>
              이미 계정이 있으신가요?
              <Link
                href='/signin/owner'
                className='inline underline ml-1 text-black'
              >
                로그인 하기
              </Link>
            </p>
            <p>
              사장님 회원가입은{' '}
              <Link
                href='/signup/owner'
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
              이미 계정이 있으신가요?
              <Link
                href='/signin/applicant'
                className='inline underline ml-1 text-black'
              >
                로그인 하기
              </Link>
            </p>
            <p>
              지원자 회원가입은{' '}
              <Link
                href='/signup/applicant'
                className='inline underline ml-1 text-black'
              >
                지원자 전용 페이지
              </Link>
              에서 할 수 있습니다.
            </p>
          </div>
        )}
      </div>
      {/* 입력 폼 */}
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
            className={errors.confirmPassword ? 'border-red' : ''}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-red text-sm'>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* 버튼 */}
        <Button type='submit' disabled={!isValid}>
          {isPending ? '정보 저장 중...' : '다음'}
        </Button>

        {/* 약관 안내 */}
        <p className='flex items-center justify-center text-[16px] text-black100 my-[20px]'>
          가입시{' '}
          <Link
            href={`/auth/signup/${role}`}
            target='_blank'
            rel='noopener noreferrer'
            className='inline underline ml-1 text-primary-orange300'
          >
            이용약관
          </Link>
          에 동의한 것으로 간주됩니다.
        </p>
      </div>

      <KakaoSignUp />
    </form>
  );
}
