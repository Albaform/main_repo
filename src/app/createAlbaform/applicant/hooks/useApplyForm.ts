import { useApplications } from '@/hooks/mutation/useApplications';
import {
  AlbaformApplyInput,
  albaformApplySchema,
} from '@/schemas/albaformApplySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useApplyForm = (formId: number) => {
  const router = useRouter();

  const { mutate: postApplyForm, isPending } = useApplications();

  const form = useForm<AlbaformApplyInput>({
    resolver: zodResolver(albaformApplySchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: AlbaformApplyInput) => {
    let password = '';

    const payload = {
      ...formData,
      experienceMonths: Number(formData.experienceMonths),
      password,
    };
    postApplyForm(
      { formId, payload },
      {
        onSuccess: () => {
          router.push('/myAlbaform/applicant');
        },
      },
    );
  };

  return { form, onSubmit, isPending };
};
