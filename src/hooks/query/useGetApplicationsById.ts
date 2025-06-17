// 지원 상세 조회
// GET 'applications/:applicationId'

import { fetchGetApplicationsById } from '@/lib/fetch/application';
import { useQuery } from '@tanstack/react-query';

export const useGetApplicationsById = (
  formId: number,
  applicationId: number,
) => {
  return useQuery({
    queryKey: ['applications', formId],
    queryFn: () => fetchGetApplicationsById(applicationId),
  });
};
