import { AlbaformApplyInput } from '@/schemas/albaformApplySchema';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface TextInputProps {
  label: string;
  name: keyof AlbaformApplyInput;
  type: string;
  placeholder: string;
  formLogic: ApplyFormLogicsProps;
  handleDraftChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export interface ApplyFormLogicsProps {
  form: UseFormReturn<AlbaformApplyInput>;
  onSubmit: (formData: AlbaformApplyInput) => void;
  isPending: boolean;
  handleDraftChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleDraftSave?: () => void;
}

export type AlbaformApplyPayload = Omit<
  AlbaformApplyInput,
  'experienceMonths' | 'resume'
> & {
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  password: string;
};

export type DraftAlbaform = Omit<AlbaformApplyInput, 'resume'> & {
  resumeName?: string;
};

export type AlbaformWithResume = DraftAlbaform & { resume: File | null };

export interface RestoreModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}
