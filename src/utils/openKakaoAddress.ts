export const openKakaoAddress = (onComplete: (address: string) => void) => {
    if (typeof window === 'undefined' || !window.daum?.Postcode) return;
  
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.roadAddress || data.address;
        onComplete(fullAddress);
      },
    }).open();
  };
  