import { useState } from 'react';

export const useImgError = (src: string) => {
  const [img, setImg] = useState<Record<string, string>>({});

  const defaultImg = src;
  const handleImgError = (src: string) => {
    setImg((prev) => ({ ...prev, [src]: defaultImg }));
  };

  return { img, defaultImg, handleImgError };
};
