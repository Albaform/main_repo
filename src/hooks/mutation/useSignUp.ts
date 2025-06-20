import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignUpInput } from '@/schemas/signupSchema';

type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: any;
};

export function useSignUp(
  options?: UseMutationOptions<SignUpResponse, unknown, SignUpInput>,
) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<SignUpResponse, unknown, SignUpInput>({
    mutationFn: async (input: SignUpInput) => {
      const response = await instance.post('/auth/sign-up', input);
      const { accessToken, refreshToken, user } = response.data;
      Cookies.set('accessToken', accessToken, { path: '/' });
      Cookies.set('refreshToken', refreshToken, { path: '/' });
      return { user, accessToken, refreshToken };
    },
    onSuccess: (data, variables, context) => {
      setUser(data.user);
      router.push('/');
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('회원가입 실패:', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}
