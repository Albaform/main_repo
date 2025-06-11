'use client';

import Image from 'next/image';

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI!;
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}`;

export default function KakaoSignIn() {
  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex justify-center mt-32 flex-col items-center gap-[32px]'>
      <div className='flex items-center w-full'>
        <div className='flex-1 h-px bg-gray-100' />
        <span className='mx-7 text-xl text-gray-400 whitespace-nowrap'>
          SNS 계정으로 로그인하기
        </span>
        <div className='flex-1 h-px bg-gray-100' />
      </div>
      <button onClick={handleKakaoLogin}>
        <Image
          src='/images/logo_kakao.svg'
          alt='카카오 로그인 이미지'
          width={72}
          height={72}
        />
      </button>
    </div>
  );
}
