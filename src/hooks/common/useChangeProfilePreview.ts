'use client';

import { useEffect, useState } from 'react';

export default function useChangeProfilePreview(imageUrl: string) {
  const [isPreview, setIsPreview] = useState(imageUrl);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = '';
  };

  useEffect(() => {
    if (imageUrl.length > 0) {
      setIsPreview(imageUrl);
    }
  }, [imageUrl]);

  return { isPreview, setIsPreview, handleImgChange };
}
