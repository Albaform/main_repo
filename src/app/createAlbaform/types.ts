import { AlbaformApplyInput } from '@/schemas/albaformApplySchema';
import { UseFormReturn } from 'react-hook-form';

export interface TextInputProps {
  label: string;
  name: keyof AlbaformApplyInput;
  type: string;
  placeholder: string;
  formLogic: ApplyFormLogicsProps;
}

export interface ApplyFormLogicsProps {
  form: UseFormReturn<AlbaformApplyInput>;
  onSubmit: (formData: AlbaformApplyInput) => void;
  isPending: boolean;
}

export type AlbaformApplyPayload = Omit<
  AlbaformApplyInput,
  'experienceMonths'
> & {
  experienceMonths: number;
};
