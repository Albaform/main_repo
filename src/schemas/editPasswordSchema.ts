import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    newPassword: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' })
      .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다' })
      .regex(/\d/, { message: '숫자를 포함해야 합니다' })
      .regex(/[^a-zA-Z0-9]/, { message: '특수문자를 포함해야 합니다' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  });

export type EditPasswordInput = z.infer<typeof passwordSchema>;
