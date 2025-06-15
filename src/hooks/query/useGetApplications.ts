// 지원 현황 목록 조회
// GET 'forms/:formId/applications'

import { fetchGetApplications } from '@/lib/fetch/application';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetApplications(
  formId: number,
  orderByExperience: 'asc' | 'desc',
  orderByStatus: 'asc' | 'desc',
) {
  return useInfiniteQuery({
    queryKey: ['applications', formId, orderByExperience, orderByStatus],
    queryFn: ({ pageParam = 1 }) =>
      fetchGetApplications({
        formId,
        orderByExperience,
        orderByStatus,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
