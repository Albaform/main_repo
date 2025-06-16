import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setUser: (user: User | null) => void;
  clearUser: () => void;
  hasHydrate: boolean;
  setHasHydrate: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      hasHydrate: false,
      setHasHydrate: (state) => set({ hasHydrate: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrate(true);
      },
    },
  ),
);
