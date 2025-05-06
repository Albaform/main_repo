// 회원정보 불러오기
// GET 'users/me'

import { fetchMyComments, fetchMyPosts, fetchMyScrap } from '@/lib/fetch/user';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// 내가 작성한 게시물/댓글/스크랩 목록 조회
export const useGetMyContents = (
  selectedTab: 'post' | 'comment' | 'scrap',
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked',
  isScrapSort?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped',
) => {
  const commentQuery = useQuery({
    queryKey: ['myComments'],
    queryFn: fetchMyComments,
    staleTime: 1000 * 60,
    enabled: selectedTab === 'comment',
  });

  const queryFn = ({pageParam = 1}) => selectedTab === 'post' ? fetchMyPosts({isPostSort, cursor:pageParam}) : fetchMyScrap({isScrapSort, cursor:pageParam})
  
  const postOrScrapQuery = useInfiniteQuery({
    queryKey: [
      selectedTab === 'post' ? 'myPosts' : 'myScrap',
      selectedTab === 'post' ? isPostSort : isScrapSort,
    ],
    queryFn,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
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
