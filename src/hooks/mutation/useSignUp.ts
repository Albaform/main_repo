// 회원가입
// POST 'auth/sign-up'

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignUpInput } from '@/schemas/signupSchema';

const signUp = async ({
  email,
  password,
  name,
  nickname,
  role,
  storeName,
  storePhoneNumber,
  phoneNumber,
  location,
}: SignUpInput) => {
  const response = await instance.post('/auth/sign-up', {
    email,
    password,
    name,
    nickname,
    role,
    storeName,
    storePhoneNumber,
    phoneNumber,
    location,
  });

  const { accessToken, refreshToken, user } = response.data;

  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, { path: '/' });
  Cookies.set('refreshToken', refreshToken, { path: '/' });

  return { user };
};

export const useSignUp = (onSuccess?: () => void) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setUser(data.user);
      router.push('/');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};
