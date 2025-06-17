'use client';

import { useRef } from 'react';
import { useKakaoMap } from '@/hooks/common/useKakaoMap';

export default function StoreMap({
  address,
  $applicationDetail,
}: {
  address: string;
  $applicationDetail?: boolean;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap(mapRef, address);

  return (
    <>
      <div
        ref={mapRef}
        // CSS는 임시이므로 디자인에 맞춰 수정 필요
        className={`w-full rounded-md border border-gray-300 ${
          $applicationDetail
            ? 'h-[calc(100vw_*_(562/1920))] max-h-[400px]'
            : 'h-[380px]'
        }`}
      />
    </>
  );
}
