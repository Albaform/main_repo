'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoSignUpRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const signup = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/signup/kakao`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'kakao',
              code,
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
            }),
          },
        );

        if (!res.ok) throw new Error('카카오 인증 실패');

        const { accessToken } = await res.json();
        localStorage.setItem('accessToken', accessToken);

        router.push('/auth/authinfo/owner');
      } catch (err) {
        alert('카카오 인증 실패. 다시 시도해주세요.');
        router.push('/auth/signup/owner');
      }
    };

    signup();
  }, [searchParams]);

  return (
    <p className='text-center mt-20 text-xl'>카카오 인증 처리 중입니다...</p>
  );
}
