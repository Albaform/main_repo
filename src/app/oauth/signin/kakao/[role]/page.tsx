'use client';

import { useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import instance from '@/lib/api/api';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';

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

  useEffect(() => {
    if (!code) {
      toast.error('인가 코드가 없습니다.');
      setTimeout(() => {
        router.push(`/signin/${role}`);
      }, 1500);
      return;
    }

    const loginWithKakao = async () => {
      try {
        const redirectUri =
          window.location.origin + `/oauth/signin/kakao/${role}`;
        const res = await instance.post('/oauth/sign-in/kakao', {
          token: code,
          redirectUri,
        });
        const { accessToken, refreshToken, user } = res.data;

        Cookies.set('accessToken', accessToken, { path: '/' });
        Cookies.set('refreshToken', refreshToken, { path: '/' });

        setUser?.(user);

        router.replace('/');
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || '카카오 로그인에 실패했습니다.',
        );
      }
    };

    loginWithKakao();
  }, [code, router, role, setUser]);

  return <LoadingSpinner text='카카오 로그인 처리중입니다...' />;
}
