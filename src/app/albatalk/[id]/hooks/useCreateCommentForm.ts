import { usePostComments } from '@/hooks/mutation/usePostComments';
import {
  CreateCommentInput,
  createCommentSchema,
} from '@/schemas/updateCommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export function useCreateCommentForm(postId: number) {
  const queryClient = useQueryClient();

  const { mutate: patchCreateComment, isPending } = usePostComments();

  const form = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: 'onChange',
  });

  const { setValue } = form;

  const onSubmit = (formData: CreateCommentInput) => {
    const { createComment } = formData;

    if (!postId || !createComment) return;

    patchCreateComment(
      { postId, createComment },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          setValue('createComment', '');
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
