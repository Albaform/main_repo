import { useEditPosts } from '@/hooks/mutation/useEditPosts';
import { usePostPosts } from '@/hooks/mutation/usePostPosts';
import { useUploadImage } from '@/hooks/mutation/useUploadImage';
import { useGetPostsById } from '@/hooks/query/useGetPostsById';
import { AlbatalkInput, editAlbatalkSchema } from '@/schemas/albatalkSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);

  const queryClient = useQueryClient();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const { data: postByIdData } = useGetPostsById(postId);
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage();
  const { mutate: patchEditPosts, isPending: isUploadingPost } = useEditPosts();

  const form = useForm<AlbatalkInput>({
    resolver: zodResolver(editAlbatalkSchema),
    mode: 'onChange',
    defaultValues: {
      title: postByIdData?.title,
      description: postByIdData?.content,
      imageUrl: postByIdData?.imageUrl,
    },
  });

  const { watch, setValue } = form;
  const watched = watch();

  useEffect(() => {
    if (postByIdData) {
      setValue('title', postByIdData.title || '');
      setValue('description', postByIdData.content || '');
      setValue('imageUrl', postByIdData.imageUrl || '');
    }
  }, [postByIdData, setValue]);

  const isModified =
    watched.title !== postByIdData?.title ||
    watched.description !== postByIdData?.content ||
    watched.imageUrl !== postByIdData?.imageUrl;

  const isPending = isUploadingImage || isUploadingPost;

  const onSubmit = async (formData: AlbatalkInput) => {
    let imageUrl;
    if (selectedImageFile) {
      imageUrl = await uploadImage(selectedImageFile);
    }

    const payload = {
      ...formData,
      imageUrl,
    };

    const refetchPosts = async () => {
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
    };

    patchEditPosts(
      { postId, payload },
      {
        onSuccess: async () => {
          await refetchPosts();
          router.push(`/albatalk/${postId}`);
        },
      },
    );
  };

  return {
    postByIdData,
    form,
    onSubmit,
    selectedImageFile,
    setSelectedImageFile,
    isModified,
    isPending,
  };
};
