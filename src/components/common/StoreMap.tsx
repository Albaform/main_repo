'use client';

import { useRef } from 'react';
import { useKakaoMap } from '@/hooks/common/useKakaoMap';

export default function StoreMap({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap(mapRef, address);

  return (
    <>
      <div
        ref={mapRef}
        // CSS는 임시이므로 디자인에 맞춰 수정 필요
        className='w-full h-[300px] rounded-md border border-gray-300'
      />
    </>
  );
}
