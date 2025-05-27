type KakaoAddressSearchResult = {
  address: string;
  y: string;
  x: string;
};

type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

const addressCache = new Map<string, { x: number; y: number }>();

export const getCoordsByAddress = (
  address: string,
): Promise<{ x: number; y: number }> => {
  if (addressCache.has(address)) {
    return Promise.resolve(addressCache.get(address)!);
  }

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('No Client');

    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.load) {
      return reject('Kakao 지도 API가 완전히 로드되지 않았습니다.');
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        address,
        (result: KakaoAddressSearchResult[], status: KakaoStatus) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const { x, y } = result[0];
            const parsed = { x: parseFloat(x), y: parseFloat(y) };
            addressCache.set(address, parsed);
            resolve(parsed);
          } else {
            reject(`좌표 변환 실패 - 상태: ${status}`);
          }
        },
      );
    });
  });
};
