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

export const signUpSchema2Base = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  name: z.string().optional().or(z.literal('')),
  phoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  role: z.enum(['OWNER', 'APPLICANT']),
  storeName: z.string().optional(),
  storePhoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  location: z.string().min(1, { message: '주소를 입력해주세요.' }),
});

export const signUpSchema2 = signUpSchema2Base.superRefine((data, ctx) => {
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
});

export const SignUpSchema = signUpSchema1Base
  .omit({ confirmPassword: true })
  .merge(signUpSchema2Base);

export type SignUp1Input = z.infer<typeof signUpSchema1>;
export type SignUp2Input = z.infer<typeof signUpSchema2>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
