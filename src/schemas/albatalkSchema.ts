import { z } from 'zod';

export const baseAlbatalkSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '내용은 필수입니다'),
  imageUrl: z.string(),
});

export const newAlbatalkSchema = baseAlbatalkSchema.extend({});
export const editAlbatalkSchema = baseAlbatalkSchema.extend({});

export type AlbatalkInput = z.infer<typeof baseAlbatalkSchema>;
