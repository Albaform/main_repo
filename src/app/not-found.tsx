'use client';

import Image from 'next/image';
import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const isNotFoundAtom = atom(false);

export default function NotFound() {
  const router = useRouter();
  const setIsNotFound = useSetAtom(isNotFoundAtom);

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, [setIsNotFound]);

  return (
    <ResponsiveStyle>
      <div className='text-center justify-items-center mt-[100px]'>
        <Image
          src='/images/notFound.png'
          alt='NotFound'
          width={100}
          height={100}
        />
        <p className='mt-[32px] text-[26px] font-medium text-primary-blue300'>
          페이지가 없거나 접근할 수 없어요
          <span className='block font-light text-[18px] text-gray-500 mt-[5px]'>
            입력하신 주소가 맞는지 다시 확인해주세요
          </span>
        </p>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='mt-[50px] h-14 bg-primary-blue300 rounded-[33px] px-7 text-white transition duration-[.3s] hover:bg-orange-400 font-semibold text-[18px]'
        >
          홈으로 돌아가기
        </button>
      </div>
    </ResponsiveStyle>
  );
}
