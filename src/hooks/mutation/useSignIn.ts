'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';

interface SignInProps {
  email: string;
  password: string;
}

const signIn = async ({ email, password }: SignInProps) => {
  const response = await instance.post('/auth/sign-in', { email, password });

  const { accessToken, refreshToken, user } = response.data;

  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, { path: '/' });
  Cookies.set('refreshToken', refreshToken, { path: '/' });

  return { user };
};

export const useSignIn = (onSuccess?: () => void) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setUser(data.user);
      router.push('/');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert(
        '로그인에 실패하였습니다. 입력하신 정보를 다시 한 번 확인해주세요.',
      );
    },
  });
};
