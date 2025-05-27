// 회원정보 불러오기
// GET 'users/me'

import { fetchUser } from '@/lib/fetch/user';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchUser,
  });
};
