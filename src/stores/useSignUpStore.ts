import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SignUp1Input,
  SignUp2Input,
  SignUpInput,
} from '@/schemas/signupSchema';

type PartialSignUpInput = Partial<SignUpInput>;

interface SignUpStore {
  data: PartialSignUpInput;
  // 1차 confirmPassword는 저장 X
  setStep1: (step1: Omit<SignUp1Input, 'confirmPassword'>) => void;
  // 2차 전체저장
  setStep2: (step2: SignUp2Input) => void;
  // localstroage 비움
  reset: () => void;
}

export const useSignUpStore = create<SignUpStore>()(
  persist(
    (set) => ({
      data: {},
      setStep1: (step1) =>
        set((state) => ({
          data: { ...state.data, ...step1 },
        })),

      setStep2: (step2) =>
        set((state) => ({
          data: { ...state.data, ...step2 },
        })),

      reset: () => set({ data: {} }),
    }),
    {
      name: 'signup-storage',
    },
  ),
);
