'use client';

import { useState, useCallback } from 'react';
import CustomButton from '../components/CustomButton';
import StepSelector from '../components/StepSelector';
import FormInfo, { InfoFormValues } from '../components/FormInfo';
import FormCondition, {
  ConditionFormValues,
} from '../components/FormCondition';
import FormWork, { WorkFormValues } from '../components/FormWork';

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState<'info' | 'condition' | 'work'>(
    'info',
  );

  // 각 단계별 작성 상태 저장 (각 step 내용 입력 상태 기반으로 로직 구현)
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
      hourlyWage: 9860,
      isPublic: false,
    },
  });

  const isStepInProgress = (step: 'info' | 'condition' | 'work'): boolean => {
    if (step === 'info') {
      const data = formData.info;
      return !!(
        data.title.trim() ||
        data.description.trim() ||
        data.recruitmentStartDate.trim() ||
        data.recruitmentEndDate.trim() ||
        data.imageUrls.length > 0
      );
    }

    if (step === 'condition') {
      const d = formData.condition;
      return Object.values(d).some((v) => {
        if (typeof v === 'string') return v.trim() !== '';
        if (typeof v === 'number') return !isNaN(v) && v !== 0;
        return false;
      });
    }

    if (step === 'work') {
      const d = formData.condition;
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

  const handleWorkChange = useCallback((workData: WorkFormValues) => {
    setFormData((prev) => ({ ...prev, work: workData }));
  }, []);

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

          {/* 나중에 work 폼 추가 */}
          {currentStep === 'work' && (
            <FormWork
              onDataChange={handleWorkChange}
              initialValue={formData.work}
            />
          )}
        </div>
      </div>
    </>
  );
}
