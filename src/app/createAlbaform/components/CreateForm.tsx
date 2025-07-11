'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useCreateAlbaForm } from '@/hooks/mutation/usePostForms';
import CustomButton from '../components/CustomButton';
import StepSelector from '../components/StepSelector';
import FormInfo, { InfoFormValues } from '../components/FormInfo';
import FormCondition, {
  ConditionFormValues,
} from '../components/FormCondition';
import FormWork, { WorkFormValues } from '../components/FormWork';

export type CreateFormProps = {
  initialData?: {
    info: InfoFormValues;
    condition: ConditionFormValues;
    work: WorkFormValues;
  };
  isEdit?: boolean;
  onSubmit?: (data: any) => void;
  mutationInstance?: ReturnType<typeof useCreateAlbaForm>;
};

export default function CreateForm({
  initialData,
  isEdit,
  onSubmit,
  mutationInstance,
}: CreateFormProps) {
  const createAlbaForm = mutationInstance ?? useCreateAlbaForm();
  const [currentStep, setCurrentStep] = useState<'info' | 'condition' | 'work'>(
    'info',
  );

  const [formData, setFormData] = useState<{
    info: InfoFormValues;
    condition: ConditionFormValues;
    work: WorkFormValues;
  }>({
    info: {
      title: '',
      description: '',
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      imageUrls: [],
    },
    condition: {
      numberOfPositions: 0,
      gender: '',
      education: '',
      age: '',
      preferred: '',
    },
    work: {
      location: '',
      workStartDate: '',
      workEndDate: '',
      workStartTime: '',
      workEndTime: '',
      workDays: [],
      isNegotiableWorkDays: false,
      hourlyWage: 0,
      isPublic: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        info: initialData.info,
        condition: initialData.condition,
        work: initialData.work,
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    const requestData = {
      ...formData.info,
      ...formData.condition,
      ...formData.work,
    };

    if (onSubmit) {
      onSubmit(requestData);
    } else {
      createAlbaForm.mutate(requestData);
    }
  };

  const isStepInProgress = (step: 'info' | 'condition' | 'work'): boolean => {
    if (step === 'info') {
      const data = formData.info;
      return !!(
        data?.title.trim() ||
        data?.description.trim() ||
        data?.recruitmentStartDate.trim() ||
        data?.recruitmentEndDate.trim() ||
        data?.imageUrls.length > 0
      );
    }

    if (step === 'condition') {
      const d = formData.condition;
      if (!d) return false;
      return Object.values(d).some((v) => {
        if (typeof v === 'string') return v.trim() !== '';
        if (typeof v === 'number') return !isNaN(v) && v !== 0;
        return false;
      });
    }

    if (step === 'work') {
      const d = formData.work;
      if (!d) return false;
      return Object.values(d).some((v) => {
        if (typeof v === 'string') return v.trim() !== '';
        if (typeof v === 'number') return !isNaN(v) && v !== 0;
        return false;
      });
    }
    return false;
  };

  const handleInfoChange = useCallback((infoData: InfoFormValues) => {
    setFormData((prev) => ({ ...prev, info: infoData }));
  }, []);

  const handleConditionChange = useCallback(
    (conditionData: ConditionFormValues) => {
      setFormData((prev) => ({ ...prev, condition: conditionData }));
    },
    [],
  );

  const workInitialValue = useMemo(() => formData.work, [formData.work]);
  const handleWorkChange = useCallback((workData: WorkFormValues) => {
    setFormData((prev) => ({ ...prev, work: workData }));
  }, []);

  const isFormComplete = () => {
    // info
    const info = formData.info;
    if (
      !info.title.trim() ||
      !info.description.trim() ||
      !info.recruitmentStartDate.trim() ||
      !info.recruitmentEndDate.trim()
    ) {
      return false;
    }
    // condition
    const cond = formData.condition;
    if (
      !cond.numberOfPositions ||
      !cond.gender.trim() ||
      !cond.education.trim() ||
      !cond.age.trim()
    ) {
      return false;
    }
    // work
    const work = formData.work;
    if (
      !work.location.trim() ||
      !work.workStartDate.trim() ||
      !work.workEndDate.trim() ||
      !work.workStartTime.trim() ||
      !work.workEndTime.trim() ||
      !work.workDays.length ||
      !work.hourlyWage
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      {/* 상단 제목 + 취소버튼 */}
      <div
        className='
          flex justify-between items-center max-w-[375px] pt-[84px] px-[24px] mx-auto
          md:pt-[112px] min-[1025px]:max-w-[1220px] min-[1025px]:px-[120px]'
      >
        <h1
          className='
            font-semibold text-[20px] leading-[32px]
            min-[1025px]:text-[32px] min-[1025px]:leading-[46px]
          '
        >
          알바폼 만들기
        </h1>
        <CustomButton>작성취소</CustomButton>
      </div>

      {/* 조건 선택 영역 */}
      <div
        className='
          max-w-[375px] mx-auto mt-6 px-[24px] pb-[80px]
          min-[1025px]:flex min-[1025px]:gap-[40px] 
          min-[1025px]:max-w-[1220px] min-[1025px]:px-[120px] min-[1025px]:mt-6'
      >
        <StepSelector
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isStepInProgress={isStepInProgress}
          formData={formData}
          isEdit={isEdit}
          onSubmit={handleSubmit}
          createAlbaForm={createAlbaForm}
        />
        <div className='flex-1 pt-6 min-[1025px]:mt-0'>
          {currentStep === 'info' && (
            <FormInfo
              onDataChange={handleInfoChange}
              initialValue={formData.info}
            />
          )}

          {currentStep === 'condition' && (
            <FormCondition
              onDataChange={handleConditionChange}
              initialValue={formData.condition}
            />
          )}

          {currentStep === 'work' && (
            <FormWork
              onDataChange={handleWorkChange}
              initialValue={workInitialValue}
            />
          )}
        </div>
      </div>
      <div className='pb-20'>
        <CustomButton
          size='large'
          variant='large_primary'
          onClick={handleSubmit}
          disabled={createAlbaForm.isPending || !isFormComplete()}
          className='block min-[1025px]:hidden max-w-[327px] mx-auto'
        >
          {isEdit
            ? '수정하기'
            : createAlbaForm.isPending
            ? '등록 중...'
            : '등록하기'}
        </CustomButton>
      </div>
    </>
  );
}
