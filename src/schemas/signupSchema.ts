import { profile } from 'console';
import { z } from 'zod';

export const signUpSchema1Base = z.object({
  email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
    .regex(/\d/, { message: '숫자를 포함해야 합니다.' }),
  confirmPassword: z.string(),
});

export const signUpSchema1 = signUpSchema1Base.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  },
);

export const ownerSignUpSchema2Base = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),

  name: z.string().or(z.literal('')),
  phoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  role: z.enum(['OWNER', 'APPLICANT']),
  storeName: z.string().min(1, { message: '가게 이름을 입력해주세요.' }),
  storePhoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  location: z.string().min(1, { message: '주소를 입력해주세요.' }),
});

export const ownerSignUpSchema2 = ownerSignUpSchema2Base.superRefine(
  (data, ctx) => {
    if (data.role === 'OWNER') {
      if (!data.storeName) {
        ctx.addIssue({
          path: ['storeName'],
          code: z.ZodIssueCode.custom,
          message: '가게 이름을 입력해주세요.',
        });
      }
      if (!data.storePhoneNumber) {
        ctx.addIssue({
          path: ['storePhoneNumber'],
          code: z.ZodIssueCode.custom,
          message: '가게 전화번호를 입력해주세요.',
        });
      }
      if (!data.location) {
        ctx.addIssue({
          path: ['location'],
          code: z.ZodIssueCode.custom,
          message: '매장 위치를 입력해주세요.',
        });
      }
    }
  },
);

export const applicantSignUpSchema2Base = z.object({
  profileImage: z.string().url().optional(),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  name: z.string().or(z.literal('')),
  phoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  role: z.enum(['OWNER', 'APPLICANT']),
});

export const applicantSignUpSchema2 = applicantSignUpSchema2Base.superRefine(
  (data, ctx) => {
    if (data.role === 'APPLICANT') {
      if (!data.nickname) {
        ctx.addIssue({
          path: ['nickname'],
          code: z.ZodIssueCode.custom,
          message: '닉네임을 입력해주세요.',
        });
      }
      if (!data.name) {
        ctx.addIssue({
          path: ['name'],
          code: z.ZodIssueCode.custom,
          message: '이름를 입력해주세요.',
        });
      }
      if (!data.phoneNumber) {
        ctx.addIssue({
          path: ['phoneNumber'],
          code: z.ZodIssueCode.custom,
          message: '전화번호를 입력해주세요.',
        });
      }
    }
  },
);

export type SignUp1Input = z.infer<typeof signUpSchema1>;

export const OwnerSignUpSchema = signUpSchema1Base
  .omit({ confirmPassword: true })
  .merge(ownerSignUpSchema2Base);
export type OwnerSignUp2Input = z.infer<typeof ownerSignUpSchema2>;
export type OwnerSignUpInput = z.infer<typeof OwnerSignUpSchema>;

export const ApplicantSignUpSchema = signUpSchema1Base
  .omit({ confirmPassword: true })
  .merge(applicantSignUpSchema2Base);
export type ApplicantSignUp2Input = z.infer<typeof applicantSignUpSchema2>;
export type ApplicantSignUpInput = z.infer<typeof ApplicantSignUpSchema>;
