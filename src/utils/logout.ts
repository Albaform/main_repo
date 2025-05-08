import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/useAuthStore';

export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  useAuthStore.getState().clearUser();
};
