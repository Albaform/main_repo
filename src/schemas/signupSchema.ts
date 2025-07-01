import { z } from 'zod';

export type SignUpStep1Input = {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'OWNER' | 'APPLICANT';
};

// 폼 1차 입력값 저장/전송 타입 (confirmPassword 제거)
export type SignUpStep1InputStore = Omit<SignUpStep1Input, 'confirmPassword'>;

export type SignUpStep2Input = {
  role: 'OWNER' | 'APPLICANT';
  nickname: string;
  name: string;
  phoneNumber: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
};

export const SignUpStep1Schema = z.object({
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
  confirmPassword: z
    .string()
    .min(6, { message: '비밀번호를 한번 더 입력해주세요.' }),
  role: z.enum(['OWNER', 'APPLICANT']),
});

export const SignUpStep2Schema = z.object({
  role: z.enum(['OWNER', 'APPLICANT']),
  nickname: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  storeName: z.string().optional(),
  storePhoneNumber: z.string().optional(),
  location: z.string().optional(),
});

export type SignUpInput = SignUpStep1InputStore & SignUpStep2Input;
