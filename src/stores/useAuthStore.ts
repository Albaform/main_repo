import { create } from 'zustand';

interface User {
  location: string;
  phoneNumber: string;
  storeName: string;
  storePhoneNumber: string;
  name: string;
  nickname: string;
  role: string;
  imageUrl: string;
  email: string;
  id: number;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn: false,
}));
