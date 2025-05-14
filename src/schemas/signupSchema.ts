import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
      .regex(/\d/, { message: '숫자를 포함해야 합니다.' }),
    confirmPassword: z.string(),
    /** @TODO */
    // 테스트 계정 사용 때문에 임시 주석처리
    // .regex(/[^a-zA-Z0-9]/, { message: '특수문자를 포함해야 합니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
