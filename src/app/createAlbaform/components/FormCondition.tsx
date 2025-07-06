'use client';

import React, { useState, useEffect } from 'react';
import InputDropdown from './InputDropdown';
import { FormWrapper, FormGroup, FormLabel, RequiredMark } from './Form.styles';

export interface ConditionFormValues {
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
}

interface FormConditionProps {
  onDataChange: (data: ConditionFormValues) => void;
  initialValue: ConditionFormValues;
}

export default function FormCondition({
  onDataChange,
  initialValue,
}: FormConditionProps) {
  const [form, setForm] = useState<ConditionFormValues>({
    numberOfPositions: initialValue.numberOfPositions,
    gender: initialValue.gender,
    education: initialValue.education,
    age: initialValue.age,
    preferred: initialValue.preferred,
  });
  const [customPreferred, setCustomPreferred] = useState(
    initialValue.preferred && initialValue.preferred !== '없음'
      ? initialValue.preferred
      : '',
  );

  // 초기값 바뀔 때(예: 수정 진입 등) state 재설정
  useEffect(() => {
    setForm({ ...initialValue });
    setCustomPreferred(
      initialValue.preferred && initialValue.preferred !== '없음'
        ? initialValue.preferred
        : '',
    );
  }, [initialValue]);

  // 값 바뀔 때마다 바로 부모에 알림 (onChange에서만!)
  const handleChange = (key: keyof ConditionFormValues, value: any) => {
    let nextForm = { ...form, [key]: value };
    // 우대사항이 '직접입력'일 때만 customPreferred 적용
    if (key === 'preferred' && value === '직접입력') {
      nextForm.preferred = customPreferred;
    }
    setForm(nextForm);
    onDataChange(nextForm);
  };

  // 직접입력 textarea 입력
  const handleCustomPreferredChange = (value: string) => {
    setCustomPreferred(value);
    const nextForm = { ...form, preferred: value };
    setForm(nextForm);
    onDataChange(nextForm);
  };

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          모집인원 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={form.numberOfPositions}
          onChange={(v) => handleChange('numberOfPositions', v)}
          options={[0, 1, 2, 3, 4, 5]}
          placeholder='선택'
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          성별 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={form.gender}
          onChange={(v) => handleChange('gender', v)}
          options={['성별무관', '남성', '여성']}
          placeholder='선택'
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          학력 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={form.education}
          onChange={(v) => handleChange('education', v)}
          options={[
            '학력무관',
            '고졸 이상',
            '대졸(2, 3년제) 이상',
            '대졸(4년제) 이상',
          ]}
          placeholder='선택'
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          연령 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={form.age}
          onChange={(v) => handleChange('age', v)}
          options={['연령무관', '20대', '30대', '40대 이상']}
          placeholder='선택'
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          우대사항 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={
            form.preferred === ''
              ? '없음'
              : form.preferred === customPreferred
              ? '직접입력'
              : form.preferred
          }
          onChange={(v) => handleChange('preferred', v)}
          options={['없음', '직접입력']}
          placeholder='선택'
        />
        {form.preferred === customPreferred && (
          <textarea
            className='
              border-[0.5px] border-solid border-[var(--gray100)]
              bg-[var(--background200)] text-[var(--black400)] text-[14px]
              w-full h-[110px] mt-[-4px] p-[14px] pb-[12px] rounded-[8px]
            '
            placeholder='우대사항을 작성해주세요.'
            value={customPreferred}
            onChange={(e) => handleCustomPreferredChange(e.target.value)}
          />
        )}
      </FormGroup>
    </FormWrapper>
  );
}
