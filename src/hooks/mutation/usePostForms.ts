// 알바폼생성
// POST '/forms'
import instance from '@/lib/api/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useCreateAlbaForm = () =>
  useMutation({
    mutationFn: async (formData: any) => {
      const response = await instance.post('/forms', formData);
      return response.data;
    },
    onSuccess: () => {
      const router = useRouter();
      router.push('/myAlbaform/owner');
    },
  });

export { useCreateAlbaForm };
