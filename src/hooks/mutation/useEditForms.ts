// 알바폼 수정
// PATCH '/forms/:formId'

// hooks/mutation/useEditAlbaForm.ts
import instance from '@/lib/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export async function getAlbaFormById(id: string) {
  const response = await instance.get(`/forms/${id}`);
  return response.data;
}

export function useEditAlbaForm(formId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: any) => {
      const response = await instance.patch(`/forms/${formId}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey?.[0];
          return key === 'albaforms' || key === 'forms';
        },
      });
      if (onSuccess) onSuccess();
      router.push('/myAlbaform/owner');
    },
  });
}
