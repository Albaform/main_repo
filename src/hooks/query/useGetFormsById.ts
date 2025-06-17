// 알바폼 상세 조회
// GET '/forms/:formId'

import { fetchGetFormsById } from '@/lib/fetch/form';
import { useQuery } from '@tanstack/react-query';

export const useGetFormsById = (formId: number) => {
  return useQuery({
    queryKey: ['albaform', formId],
    queryFn: () => fetchGetFormsById(formId),
  });
};
