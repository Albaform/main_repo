// 게시글 등록하기

import { fetchPostPosts } from '@/lib/fetch/post';
import { useMutation } from '@tanstack/react-query';

// POST '/posts'
export const usePostPosts = () => {
  return useMutation({
    mutationFn: fetchPostPosts,
  });
};
