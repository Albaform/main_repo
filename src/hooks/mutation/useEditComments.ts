// 댓글수정

import { fetchEditComments } from '@/lib/fetch/comment';
import { useMutation } from '@tanstack/react-query';

// PATCH 'comments/:commentId'
export const useEditComments = () => {
  return useMutation({
    mutationFn: fetchEditComments,
  });
};
