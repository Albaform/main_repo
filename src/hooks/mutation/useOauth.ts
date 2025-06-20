import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import instance from '@/lib/api/api';

export interface KakaoSignUpPayload {
  location?: string;
  phoneNumber?: string;
  storePhoneNumber?: string;
  storeName?: string;
  role: string;
  nickname?: string;
  name?: string;
  redirectUri: string;
  token: string;
}

export function useKakaoSignUpMutation(
  options?: UseMutationOptions<any, unknown, KakaoSignUpPayload>,
) {
  return useMutation({
    mutationFn: async (payload: KakaoSignUpPayload) => {
      const res = await instance.post('/oauth/sign-up/kakao', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
    },
    ...options,
  });
}

type KakaoSignInPayload = {
  token: string;
  redirectUri: string;
};

type KakaoSignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: any;
};

export function useKakaoSignInMutation(
  options?: UseMutationOptions<
    KakaoSignInResponse,
    unknown,
    KakaoSignInPayload
  >,
) {
  return useMutation({
    mutationFn: async (payload: KakaoSignInPayload) => {
      const res = await instance.post('/oauth/sign-in/kakao', payload);
      return res.data;
    },
    ...options,
  });
}
