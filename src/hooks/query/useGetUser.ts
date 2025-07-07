// 회원정보 불러오기
// GET 'users/me'

import { fetchUser } from '@/lib/fetch/user';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchUser,
    enabled,
    retry: false,
  });
};
