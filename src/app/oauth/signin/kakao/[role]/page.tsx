'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';
import { useKakaoSignInMutation } from '@/hooks/mutation/useOauth';
import Toast from '@/components/tooltip/Toast';

export default function KakaoSignInCallbackPage({
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
  const setUser = useAuthStore((state) => state.setUser);
  const [showToast, setShowToast] = useState(false);

  const { mutate } = useKakaoSignInMutation({
    onSuccess: (data) => {
      Cookies.set('accessToken', data.accessToken, { path: '/' });
      Cookies.set('refreshToken', data.refreshToken, { path: '/' });
      setUser?.(data.user);

      setShowToast(true);
    },
    onError: (error: any) => {
      setShowToast(true);
      setTimeout(() => {
        router.push(`/signin/${role}`);
      }, 1500);
    },
  });

  useEffect(() => {
    if (!code) {
      setShowToast(true);
      setTimeout(() => {
        router.push(`/signin/${role}`);
      }, 1500);
      return;
    }

    mutate({
      token: code,
      redirectUri: window.location.origin + `/oauth/signin/kakao/${role}`,
    });
  }, [code, router, role, mutate]);

  const handleToastClose = () => {
    setShowToast(false);
    router.replace('/');
  };

  return (
    <>
      <LoadingSpinner text='카카오 로그인 처리중입니다...' />
      {showToast && <Toast onClose={handleToastClose}>로그인되었습니다!</Toast>}
    </>
  );
}
