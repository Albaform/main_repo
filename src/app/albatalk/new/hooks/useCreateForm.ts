import { usePostPosts } from '@/hooks/mutation/usePostPosts';
import { useUploadImage } from '@/hooks/mutation/useUploadImage';
import { AlbatalkInput, newAlbatalkSchema } from '@/schemas/albatalkSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage();

  const { mutateAsync: patchPostPosts, isPending: isUploadingPost } =
    usePostPosts();

  const isFetching = useIsFetching({ queryKey: ['posts'] }) > 0;
  const isPending = isUploadingImage || isUploadingPost || isFetching;

  const form = useForm<AlbatalkInput>({
    resolver: zodResolver(newAlbatalkSchema),
    mode: 'onChange',
    defaultValues: {
      imageUrl: '',
    },
  });

  const onSubmit = async (formData: AlbatalkInput) => {
    let imageUrl;
    if (selectedImageFile) {
      imageUrl = await uploadImage(selectedImageFile);
    }

    const payload = {
      ...formData,
      imageUrl,
    };

    const data = await patchPostPosts(payload);
    await queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
    router.push(`/albatalk/${data.id}`);
  };

  return {
    form,
    onSubmit,
    selectedImageFile,
    setSelectedImageFile,
    isPending,
  };
};
