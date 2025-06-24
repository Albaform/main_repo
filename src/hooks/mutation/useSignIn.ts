import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { SignInInput } from '@/schemas/signinSchema';
import { useAuthStore } from '@/stores/useAuthStore';
import instance from '@/lib/api/api';
import { AxiosError, AxiosHeaders, AxiosRequestHeaders } from 'axios';

const signIn = async ({ email, password }: SignInInput) => {
  const response = await instance.post('/auth/sign-in', { email, password });
  const { accessToken, refreshToken, user } = response.data;
  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, { path: '/' });
  Cookies.set('refreshToken', refreshToken, { path: '/' });

  return { user };
};

const roleMismatchError: Partial<AxiosError> = {
  isAxiosError: true,
  message: '이 페이지에서는 해당 역할로 로그인할 수 없습니다.',
  response: {
    status: 408,
    statusText: 'Forbidden',
    data: {},
    headers: { dummy: true } as unknown as AxiosRequestHeaders,
    config: {
      headers: { dummy: true } as unknown as AxiosRequestHeaders,
      method: 'post',
      url: '/auth/sign-in',
    },
  },
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
      const user = data.user;

      if (
        !user ||
        user.role.toString().toLowerCase() !==
          expectedRole.toString().toLowerCase()
      ) {
        throw roleMismatchError;
      }
      return data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setUser(data.user);
      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options?.onError) options.onError(error);
    },
  });
}
