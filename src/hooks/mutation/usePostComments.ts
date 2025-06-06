// 댓글달기

import { fetchPostComments } from '@/lib/fetch/comment';
import { useMutation } from '@tanstack/react-query';

// POST '/posts/:postId/comments'
export const usePostComments = () => {
  return useMutation({
    mutationFn: fetchPostComments,
  });
};
