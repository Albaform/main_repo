'use client';

import Image from 'next/image';

export default function KakaoSignUp() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNUP_URI;
  // 카카오 인증 URL 구성 (인가 코드 받기 위한 URL)
  const kakaoSignUpUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri ?? '',
  )}&response_type=code`;

  return (
    <div className='flex justify-center mt-32 flex-col items-center gap-[32px]'>
      <div className='flex items-center w-full'>
        <div className='flex-1 h-px bg-gray-100' />
        <span className='mx-7 text-xl text-gray-400 whitespace-nowrap'>
          SNS 계정으로 로그인하기
        </span>
        <div className='flex-1 h-px bg-gray-100' />
      </div>
      <a href={kakaoSignUpUrl}>
        <Image
          src='/images/logo_kakao.svg'
          alt='카카오 로그인 이미지'
          width={72}
          height={72}
        />
      </a>
    </div>
  );
}
