// 회원정보 불러오기
// GET 'users/me'

import { fetchMyComments, fetchMyPosts, fetchMyScrap } from '@/lib/fetch/user';
import { useQuery } from '@tanstack/react-query';

// 내가 작성한 게시물/댓글/스크랩 목록 조회
export const useGetMyContents = (
  selectedTab: 'post' | 'comment' | 'scrap',
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked',
) => {
  return useQuery({
    queryKey: ['post', selectedTab, isSort],
    queryFn: () =>
      selectedTab === 'post'
        ? fetchMyPosts({ isSort })
        : selectedTab === 'comment'
        ? fetchMyComments()
        : fetchMyScrap(),
    staleTime: 1000 * 60,
  });
};
