import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://fe-project-albaform.vercel.app/12-2/';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgyLCJzY29wZSI6InJlZnJlc2giLCJpYXQiOjE3NDYyNDQ4NTAsImV4cCI6MTc0Njg0OTY1MH0.fcitbGTkERrvImZVOdX1B9fObKlnslmLBAV43Zirs0s`, // 로그인 전 임시
    'Content-Type': 'application/json',
  },
});

// header
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('Refresh token not found');

        const res = await axios.post(
          '/auth/refresh',
          {},
          {
            baseURL: BASE_URL,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          Cookies.set('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/auth/signin/owner';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
