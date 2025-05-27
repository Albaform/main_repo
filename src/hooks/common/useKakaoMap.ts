import { useEffect, useState } from 'react';
import { getCoordsByAddress } from '@/utils/getCoordsByAddress';

declare global {
  interface Window {
    kakao: any;
  }
}

export const useKakaoMap = (
  mapRef: React.RefObject<HTMLDivElement | null>,
  address: string,
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address || !mapRef.current) return;

    getCoordsByAddress(address)
      .then(({ x, y }) => {
        if (!window.kakao) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(y, x),
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(y, x),
        });
      })
      .catch((err) => {
        console.error(err);
        setError('지도 로딩 실패');
      });
  }, [address]);

  return { error };
};
