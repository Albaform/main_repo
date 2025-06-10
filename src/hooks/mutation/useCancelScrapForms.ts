// 알바폼 스크랩취소

import { fetchCancelScrapForms } from '@/lib/fetch/form';
import { useMutation } from '@tanstack/react-query';

// DELETE '/forms/:formId/scrap'
export const useCancelScrapForms = () => {
  return useMutation({
    mutationFn: fetchCancelScrapForms,
  });
};
