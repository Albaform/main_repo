// 이미지 bin파일 랜더링
// POST 'images/upload'

import { fetchUploadImage } from '@/lib/fetch/file';
import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: fetchUploadImage,
  });
};
