// 지원 상태 수정(면접대기-면접완료-채용완료)

import { fetchEditApplications } from '@/lib/fetch/application';
import { useMutation } from '@tanstack/react-query';

// PATCH 'applications/:applicationId'
export const useEditApplications = () => {
  return useMutation({
    mutationFn: fetchEditApplications,
  });
};
