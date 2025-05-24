// 비밀번호 변경

import { fetchUpdatePassword } from '@/lib/fetch/user';
import { useMutation } from '@tanstack/react-query';

// PATCH 'users/me/password'
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: fetchUpdatePassword,
  });
};
