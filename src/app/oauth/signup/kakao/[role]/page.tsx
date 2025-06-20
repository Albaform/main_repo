'use client';

import { useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function KakaoSignUpCallbackPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);

  if (role !== 'applicant' && role !== 'owner') {
    notFound();
  }

  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      toast.error('인가 코드가 없습니다.');
      setTimeout(() => {
        router.push('/signup/owner');
      }, 1500);
      return;
    }

    router.replace(`/signup/info/${role}?code=${code}`);
  }, [code, router, role]);

  return <LoadingSpinner text='카카오 회원가입 처리중입니다...' />;
}
