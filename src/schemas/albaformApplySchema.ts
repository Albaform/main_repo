import { z } from 'zod';

export const albaformApplySchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(1, '연락처를 입력해주세요'),
  experienceMonths: z
    .string()
    .min(1, '경력을 입력해주세요(경력 사항이 없을 시 0으로 표기)')
    .refine((val) => !isNaN(Number(val)), {
      message: '숫자만 입력해주세요',
    }),
  resume: z.instanceof(File, {message:'이력서를 추가해주세요'}).refine((file) => file.size > 0, {
    message:'이력서를 추가해주세요'
  }),
  introduction: z.string().min(1, '자기소개를 입력해주세요'),
});

export type AlbaformApplyInput = z.infer<typeof albaformApplySchema>;
