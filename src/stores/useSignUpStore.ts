import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  SignUp1Input,
  OwnerSignUp2Input,
  ApplicantSignUp2Input,
  OwnerSignUpInput,
  ApplicantSignUpInput,
} from '@/schemas/signupSchema';

type PartialOwnerInput = Partial<OwnerSignUpInput>;
type PartialApplicantInput = Partial<ApplicantSignUpInput>;

interface SignUpStore {
  // 유동적으로 owner/applicant 타입 모두 가능하도록 설정
  data: PartialOwnerInput | PartialApplicantInput;

  // step1: 공통 (owner/applicant 동일)
  setStep1: (step1: Omit<SignUp1Input, 'confirmPassword'>) => void;

  // step2: owner 또는 applicant
  setStep2: (step2: OwnerSignUp2Input | ApplicantSignUp2Input) => void;

  // 초기화
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
