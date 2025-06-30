// 내 알바폼 생성

import instance from '@/lib/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useCreateAlbaForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: any) => {
      const response = await instance.post('/forms', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          console.log(query.queryKey);
          const key = query.queryKey?.[0];
          return key === 'albaforms' || key === 'forms';
        },
      });
      router.push('/myAlbaform/owner');
    },
  });
};

export { useCreateAlbaForm };

//router.push('/myAlbaform/owner');
