import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePassword } from '@/hooks/mutation/useUpdatePassword';
import {
    EditPasswordInput,
    passwordSchema,
} from '@/schemas/editPasswordSchema';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

export function useEditPasswordForm({
  setShowModal,
  onSuccess,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
}) {
  const { mutate: patchUpdatePassword, isPending } = useUpdatePassword();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const { setError } = form;

  const onSubmit = (formData: EditPasswordInput) => {
    patchUpdatePassword(formData, {
      onSuccess: () => {
        setShowModal(false);
        onSuccess();
      },
      onError: (error: any) => {
        const axiosError = error as AxiosError<{ message: string }>;

        const status = axiosError.response?.status;
        const errorMessage = axiosError.response?.data?.message;

        if (
          status === 401 &&
          errorMessage === '현재 비밀번호가 일치하지 않습니다.'
        ) {
          setError('currentPassword', {
            type: 'manual',
            message: '현재 비밀번호를 확인해주세요',
          });
        } else {
          alert(errorMessage || '알 수 없는 오류가 발생했습니다.');
        }
      },
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
