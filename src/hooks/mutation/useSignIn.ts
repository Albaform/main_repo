import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { SignInInput } from '@/schemas/signinSchema';
import { SignInResponse } from '@/types/SignInResponse';
import instance from '@/lib/api/api';

const signIn = async ({ email, password }: SignInInput) => {
  const response = await instance.post('/auth/sign-in', { email, password });
  const { accessToken, refreshToken, user } = response.data;
  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, { path: '/' });
  Cookies.set('refreshToken', refreshToken, { path: '/' });

  return { user };
};

export function useSignIn(
  expectedRole: string,
  options?: {
    onSuccess?: (data: { user: any }) => void;
    onError?: (error: Error) => void;
  },
) {
  return useMutation<{ user: any }, Error, SignInInput>({
    mutationFn: async (input: SignInInput) => {
      const data = await signIn(input);
      const user = data.user?.[0];

      if (!user || user.role.toLowerCase() !== expectedRole) {
        throw new Error('이 페이지에서는 해당 역할로 로그인할 수 없습니다.');
      }
      return data;
    },
    ...options,
  });
}
