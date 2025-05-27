import { z } from 'zod';

export const baseUserSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
  nickname: z.string(),
  store: z.string(),
  storeTel: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
});

export const ownerProfileSchema = baseUserSchema.extend({
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  store: z.string().min(1, '상호명을 입력해주세요'),
  storeTel: z.string().min(1, '가게 전화번호를 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
});

export const applicantProfileSchema = baseUserSchema.extend({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(1, '연락처를 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
});

export type EditUserInput = z.infer<typeof baseUserSchema>;
