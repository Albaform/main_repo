import { AlbaformWithResume, DraftAlbaform } from '../../types';
import { UseFormReturn } from 'react-hook-form';

export function restoreDraftToForm({
  userId,
  formId,
  setValue,
  setIsValue,
  setResumeName,
}: {
  userId: number;
  formId: number;
  setValue: UseFormReturn<any>['setValue'];
  setIsValue: React.Dispatch<React.SetStateAction<AlbaformWithResume>>;
  setResumeName?: (name: string) => void;
}) {
  const key = `application_draft_${userId}_${formId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved) as DraftAlbaform;
    const { resumeName, ...rest } = parsed;

    // 1. RHF 값 복원
    (Object.entries(rest) as [keyof DraftAlbaform, any][]).forEach(
      ([key, value]) => {
        setValue(key, value, {
          shouldDirty: true,
          shouldValidate: true,
        });
      },
    );

    // 2. isValue 상태 복원
    setIsValue((prev) => ({
      ...prev,
      ...rest,
      resume: null, // resume은 복원 불가
      resumeName: resumeName ?? '',
    }));

    // 3. resumeName 따로 표시
    if (resumeName && setResumeName) {
      setResumeName(resumeName);
    }
  } catch (err) {
    console.error('복구 실패', err);
  }
}
