// 내가 작성한 게시글 불러오기
// GET 'users/me/posts'

import { fetchMyComments, fetchMyPosts, fetchMyScrap } from "@/lib/fetch/user";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetMyContents = (
  page: number,
  itemsPerPage: number,
  selectedTab: 'post' | 'comment' | 'scrap',
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked',
  isScrapSort?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped',
) => {
  const commentQuery = useQuery({
    queryKey: ['myComments', page, itemsPerPage],
    queryFn: () => fetchMyComments(page),
    staleTime: 1000 * 60,
    enabled: selectedTab === 'comment',
    placeholderData: keepPreviousData,
  });

  const queryFn = ({ pageParam = 1 }) =>
    selectedTab === 'post'
      ? fetchMyPosts({ isPostSort, cursor: pageParam, itemsPerPage })
      : fetchMyScrap({ isScrapSort, cursor: pageParam, itemsPerPage });

  const postOrScrapQuery = useInfiniteQuery({
    queryKey: [
      selectedTab === 'post' ? 'myPosts' : 'myScrap',
      selectedTab === 'post' ? isPostSort : isScrapSort,
    ],
    queryFn,
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    enabled: selectedTab !== 'comment',
  });

  if (selectedTab === 'comment') {
    return { type: 'comment' as const, ...commentQuery };
  } else {
    return { type: selectedTab, ...postOrScrapQuery };
  }
};
