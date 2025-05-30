// 게시글 불러오기
// GET '/posts'

import { fetchGetPosts } from '@/lib/fetch/post';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetPosts = (
  itemsPerPage: number,
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked',
  isKeyword:string
) => {
  return useInfiniteQuery({
    queryKey: ['posts', isSort, isKeyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchGetPosts({ isSort, itemsPerPage, cursor: pageParam, isKeyword }),
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};
