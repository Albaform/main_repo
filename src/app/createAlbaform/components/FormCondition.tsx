'use client';

import React, { useState } from 'react';
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
  const [form, setForm] = useState<ConditionFormValues>(initialValue);
  const [customPreferred, setCustomPreferred] = useState(form.preferred || '');

  const handleChange = (key: keyof ConditionFormValues, value: any) => {
    let newForm = { ...form, [key]: value };
    // 우대사항 직접입력만 별도 처리
    if (key === 'preferred' && value === '직접입력') {
      newForm.preferred = customPreferred;
    }
    setForm(newForm);
    onDataChange(newForm);
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
          value={form.preferred}
          onChange={(v) => handleChange('preferred', v)}
          options={['없음', '직접입력']}
          placeholder='선택'
        />
        {form.preferred === '직접입력' && (
          <textarea
            className='
              border-[0.5px] border-solid border-[var(--gray100)]
              bg-[var(--background200)] text-[var(--black400)] text-[14px]
              w-full h-[110px] mt-[-4px] p-[14px] pb-[12px] rounded-[8px]'
            placeholder='우대사항을 작성해주세요.'
            value={customPreferred}
            onChange={(e) => {
              setCustomPreferred(e.target.value);
              handleChange('preferred', e.target.value);
            }}
          />
        )}
      </FormGroup>
    </FormWrapper>
  );
}
