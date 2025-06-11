// 게시글 삭제하기

import { fetchDeletePosts } from '@/lib/fetch/post';
import { useMutation } from '@tanstack/react-query';

// DELETE '/posts/:postId'
export const useDeletePost = () => {
  return useMutation({
    mutationFn: fetchDeletePosts,
  });
};
