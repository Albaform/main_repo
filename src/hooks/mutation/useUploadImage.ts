// 이미지 bin파일 랜더링
// POST 'images/upload'

import { useMutation } from '@tanstack/react-query';

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  console.log('업로드할 파일:', file);

  const response = await fetch('/images/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드 실패');
  }

  const data = await response.json();
  return data.url;
};

export const useImageUpload = () =>
  useMutation({
    mutationFn: uploadImage,
  });
