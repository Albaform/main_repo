// 알바폼 목록 삭제
// DELETE '/forms/:formId'

import { fetchDeleteForms } from '@/lib/fetch/form';
import { useMutation } from '@tanstack/react-query';

export const useDeleteForm = () => {
  return useMutation({
    mutationFn: fetchDeleteForms,
  });
};
