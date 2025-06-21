import { useEffect, useRef, useState } from 'react';
import { DraftAlbaform } from '../../types';
import { restoreDraftToForm } from '../utils/restoreDraftToForm';
import { UseFormReturn } from 'react-hook-form';
import { AlbaformApplyInput } from '@/schemas/albaformApplySchema';
import { useToastStore } from '@/stores/useToastStore';
import { getStorageKey } from '../utils/getStorageKey';

export const useDraftController = (
  form: UseFormReturn<AlbaformApplyInput>,
  userId: number,
  formId: number,
) => {
  const { showToast } = useToastStore();

  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const restoreDataRef = useRef<DraftAlbaform | null>(null);
  const [isValue, setIsValue] = useState<{
    name: string;
    phoneNumber: string;
    experienceMonths: string;
    resume: File | null;
    resumeName?: string;
    introduction: string;
  }>({
    name: '',
    phoneNumber: '',
    experienceMonths: '',
    resume: null,
    resumeName: '',
    introduction: '',
  });

  const handleDraftChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDraftSave = () => {
    const key = `application_draft_${userId}_${formId}`;
    const { resume, ...saveableForm } = isValue;
    localStorage.setItem(key, JSON.stringify(saveableForm));
    showToast('임시 저장이 완료 되었습니다 !');
  };

  useEffect(() => {
    if (!userId) return;

    const key = `application_draft_${userId}_${formId}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        restoreDataRef.current = parsed;
        setShowRestoreModal(true);
      } catch (e) {
        console.error('복구 데이터 파싱 오류:', e);
      }
    }
  }, [userId]);

  const onConfirm = () => {
    if (!restoreDataRef.current) return;

    restoreDraftToForm({
      userId,
      formId,
      setValue: form.setValue,
      setIsValue,
    });

    setShowRestoreModal(false);
    showToast('임시 저장된 내용을 복원했습니다 !');
  };

  const onCancel = () => {
    setShowRestoreModal(false);

    const key = getStorageKey(userId, formId);
    localStorage.removeItem(key);
  };

  return {
    showRestoreModal,
    isValue,
    setIsValue,
    onConfirm,
    onCancel,
    handleDraftChange,
    handleDraftSave,
  };
};
