import { z } from 'zod';

// 이메일, 비밀번호 입력 스키마
export const SignUpStep1Schema = z
  .object({
    email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
      .regex(/\d/, { message: '숫자를 포함해야 합니다.' }),
    confirmPassword: z.string(),
    role: z.enum(['OWNER', 'APPLICANT']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpStep1Input = z.infer<typeof SignUpStep1Schema>;

// 정보입력 스키마 (2단계)
export const SignUpStep2Schema = z
  .object({
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
    name: z.string().min(1, { message: '이름을 입력해주세요.' }), // name은 항상 필수
    phoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
      message: '전화번호 형식이 올바르지 않습니다.',
    }),
    role: z.enum(['OWNER', 'APPLICANT']),
    // OWNER만 필수, 나머진 undefined 가능
    storeName: z.string().optional(),
    storePhoneNumber: z.string().optional(),
    location: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === 'OWNER') {
      if (!data.storeName) {
        ctx.addIssue({
          path: ['storeName'],
          code: z.ZodIssueCode.custom,
          message: '가게 이름을 입력해주세요.',
        });
      }
      if (
        !data.storePhoneNumber ||
        !/^\d{2,3}\d{3,4}\d{4}$/.test(data.storePhoneNumber)
      ) {
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
    // APPLICANT는 name 필수
    if (data.role === 'APPLICANT' && !data.name) {
      ctx.addIssue({
        path: ['name'],
        code: z.ZodIssueCode.custom,
        message: '이름을 입력해주세요.',
      });
    }
  });

export type SignUpStep2Input = z.infer<typeof SignUpStep2Schema>;

// 합치기용 shape
const SignUpStep1Shape = {
  email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
    .regex(/\d/, { message: '숫자를 포함해야 합니다.' }),
  confirmPassword: z.string(),
  role: z.enum(['OWNER', 'APPLICANT']),
};

const SignUpStep2Shape = {
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  phoneNumber: z.string().regex(/^\d{2,3}\d{3,4}\d{4}$/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  }),
  role: z.enum(['OWNER', 'APPLICANT']),
  storeName: z.string().optional(),
  storePhoneNumber: z.string().optional(),
  location: z.string().optional(),
};

const SignUpStep1Object = z.object(SignUpStep1Shape);
const SignUpStep2Object = z.object(SignUpStep2Shape);

const MergedSchema = SignUpStep1Object.merge(SignUpStep2Object);

export const SignUpSchema = MergedSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  },
).superRefine((data, ctx) => {
  if (data.role === 'OWNER') {
    if (!data.storeName) {
      ctx.addIssue({
        path: ['storeName'],
        code: z.ZodIssueCode.custom,
        message: '가게 이름을 입력해주세요.',
      });
    }
    if (
      !data.storePhoneNumber ||
      !/^\d{2,3}\d{3,4}\d{4}$/.test(data.storePhoneNumber)
    ) {
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
  if (data.role === 'APPLICANT' && !data.name) {
    ctx.addIssue({
      path: ['name'],
      code: z.ZodIssueCode.custom,
      message: '이름을 입력해주세요.',
    });
  }
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
