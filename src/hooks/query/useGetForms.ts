// 알바폼 목록 조회
// GET '/forms'

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAlbaForms } from '@/lib/fetch/form';

export function useAlbaForms(
  itemsPerPage: number,
  postSort: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped',
  recruitingSort: boolean,
  keyword: string,
) {
  return useInfiniteQuery({
    queryKey: ['albaforms', postSort, recruitingSort, keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchAlbaForms({
        itemsPerPage,
        postSort,
        recruitingSort,
        keyword,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
