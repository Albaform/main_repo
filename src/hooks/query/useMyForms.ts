// 내가 생성한 알바 폼 불러오기

import { fetchMyForms } from '@/lib/fetch/user';
import { useInfiniteQuery } from '@tanstack/react-query';

// GET 'users/me/forms'
export const useMyForms = (
  itemsPerPage: number,
  postSort: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped',
  publicSort: boolean,
  recruitingSort: boolean,
  keyword: string,
) => {
  return useInfiniteQuery({
    queryKey: ['forms', postSort, publicSort, recruitingSort, keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyForms({
        itemsPerPage,
        postSort,
        publicSort,
        recruitingSort,
        keyword,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};
