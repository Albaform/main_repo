import { useApplications } from '@/hooks/mutation/useApplications';
import { useUploadResume } from '@/hooks/mutation/useUploadResume';
import {
  AlbaformApplyInput,
  albaformApplySchema,
} from '@/schemas/albaformApplySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AlbaformApplyPayload } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { useToastStore } from '@/stores/useToastStore';
import { getStorageKey } from '../utils/getStorageKey';

export const useApplyForm = (formId: number, userId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showToast } = useToastStore();

  const { mutateAsync: postUploadResume, isPending: postFilePending } =
    useUploadResume();
  const { mutate: postApplyForm, isPending: postApplyPending } =
    useApplications();

  const isPending = postFilePending || postApplyPending;

  const form = useForm<AlbaformApplyInput>({
    resolver: zodResolver(albaformApplySchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: AlbaformApplyInput) => {
    const { name, phoneNumber, experienceMonths, introduction, resume } =
      formData;

    let resumeId;
    let resumeName;
    let password = '12345678';

    if (resume instanceof File && resume.size > 0) {
      try {
        const response = await postUploadResume(resume);
        resumeId = response.resumeId;
        resumeName = response.resumeName;
      } catch (err) {
        console.error(err);
        return;
      }
    }

    if (!resumeId || !resumeName) return;

    const payload: AlbaformApplyPayload = {
      name,
      phoneNumber,
      introduction,
      experienceMonths: Number(experienceMonths),
      password,
      resumeId,
      resumeName,
    };
    postApplyForm(
      { formId, payload },
      {
        onSuccess: () => {
          router.push('/myAlbaform/applicant');
          queryClient.invalidateQueries({ queryKey: ['myApplications'] });
          showToast('공고 지원이 완료 되었습니다 !');

          const key = getStorageKey(userId, formId);
          localStorage.removeItem(key);
        },
      },
    );
  };

  return { form, onSubmit, isPending };
};
