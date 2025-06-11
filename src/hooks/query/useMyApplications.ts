// 내가 지원한 알바 목록 불러오기
// GET 'users/me/applications'

import { fetchMyAppications } from "@/lib/fetch/user";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMyApplications = (
  itemsPerPage: number,
  status: '' | 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED',
  keyword:string
) => {
  return useInfiniteQuery({
    queryKey: ['myApplications', status, keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyAppications({ status, itemsPerPage, cursor: pageParam, keyword }),
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};
