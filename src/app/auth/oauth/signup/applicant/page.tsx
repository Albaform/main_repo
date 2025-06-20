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
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: 'kakao',
              code,
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
            }),
          },
        );

        if (!res.ok) throw new Error('회원가입 실패');

        const data = await res.json();

        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }
        router.push('/auth/signup/appicant/authinfo');
      } catch (err) {
        console.error('카카오 회원가입 오류:', err);
        alert('회원가입 중 오류가 발생했습니다.');
        router.push('/auth/signup/appicant');
      }
    };

    signup();
  }, [searchParams]);

  return <p className='text-center mt-20 text-xl'>회원가입 처리 중입니다...</p>;
}
