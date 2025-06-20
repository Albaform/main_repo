'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function KakaoSignUpCallbackPage({
  params,
}: {
  params: { role: string };
}) {
  const { role } = params;

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

    (async () => {
      try {
        const response = await fetch('/oauth/sign-up/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            redirectUri: window.location.origin + `/oauth/signup/kakao/${role}`,
          }),
        });
        if (!response.ok) throw new Error('카카오 인증 실패');
        const data = await response.json();
        router.push(`/signup/info/${role}?token=${data.access_token}`);
      } catch (e) {
        toast.error('카카오 로그인에 실패했습니다.');
        setTimeout(() => {
          router.push('/signup/owner');
        }, 1500);
      }
    })();
  }, [code, router, role]);

  return <LoadingSpinner text='카카오 로그인 처리중입니다...' />;
}
