'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

let loaded = false;

export default function KakaoMapScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        loaded = true;
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <Script
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=f67b2213023de6e332711e951c139bb5&libraries=services&autoload=false`}
      strategy='beforeInteractive'
      onLoad={() => {
        console.log('Kakao 스크립트 로드됨');
      }}
    />
  );
}
