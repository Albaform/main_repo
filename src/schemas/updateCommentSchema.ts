import { z } from 'zod';

export const createCommentSchema = z.object({
  createComment: z.string().min(1),
});

export const editCommentSchema = z.object({
  editComment: z.string().min(1),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type EditCommentInput = z.infer<typeof editCommentSchema>;
