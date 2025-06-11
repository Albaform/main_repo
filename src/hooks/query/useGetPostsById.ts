// 게시글 상세페이지 불러오기
// GET '/posts/:postId'

import { fetchGetPostsById } from '@/lib/fetch/post';
import { useQuery } from '@tanstack/react-query';

export const useGetPostsById = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchGetPostsById(postId),
  });
};
