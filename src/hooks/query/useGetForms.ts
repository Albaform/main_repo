// 알바폼 목록 조회
// GET '/forms'

// 예시: useQuery 내부에서 직접 axios 인스턴스 사용
import { useQuery } from '@tanstack/react-query';
import { fetchAlbaForms } from '@/lib/fetch/form';
  


  export function useAlbaForms(limit = 9) {
    return useQuery({
      queryKey: ['albaForms', limit],
      queryFn: () => fetchAlbaForms(limit), 
    });
  }


