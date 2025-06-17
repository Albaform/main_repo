import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignInInput } from '@/schemas/signinSchema';

const signIn = async ({ email, password }: SignInInput) => {
  const response = await instance.post('/auth/sign-in', { email, password });
  const { accessToken, refreshToken, user } = response.data;
  console.log('로그인 응답:', response.data); // 여기!
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
      onSuccess?.();
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
