import { useEditComments } from '@/hooks/mutation/useEditComments';
import {
  EditCommentInput,
  editCommentSchema,
} from '@/schemas/updateCommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

export function useEditCommentForm({
  editingCommentId,
  setEditingCommentId,
}: {
  editingCommentId: number;
  setEditingCommentId: Dispatch<SetStateAction<number | null>>;
}) {
  const queryClient = useQueryClient();

  const { mutate: patchEditComment, isPending } = useEditComments();

  const form = useForm({
    resolver: zodResolver(editCommentSchema),
    mode: 'onChange',
  });

  const onSubmit = (formData: EditCommentInput) => {
    const { editComment } = formData;

    if (!editComment) return;

    patchEditComment(
      { commentId: editingCommentId, editComment },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          setEditingCommentId(null);
        },
      },
    );
  };

  return {
    form,
    isPending,
    onSubmit,
  };
}
