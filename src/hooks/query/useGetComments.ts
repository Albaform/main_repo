// 댓글 불러오기

import { fetchGetComments } from '@/lib/fetch/comment';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// GET '/posts/:postId/comments'
export const useGetComments = (page: number, postId: number) => {
  return useQuery({
    queryKey: ['comments', page, postId],
    queryFn: () => fetchGetComments({ page, postId }),
    staleTime: 1000 * 60,
  });
};
