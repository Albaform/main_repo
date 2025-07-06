'use client';

import React, { useEffect, useState } from 'react';
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
  const [numberOfPositions, setNumberOfPositions] = useState<number | string>(
    initialValue.numberOfPositions,
  );
  const [gender, setGender] = useState<number | string>(initialValue.gender);
  const [education, setEducation] = useState<number | string>(
    initialValue.education,
  );
  const [age, setAge] = useState<number | string>(initialValue.age);
  const [preferred, setPreferred] = useState<number | string>(
    initialValue.preferred,
  );

  const [customPreferred, setCustomPreferred] = useState('');

  useEffect(() => {
    onDataChange({
      numberOfPositions:
        typeof numberOfPositions === 'string'
          ? Number(numberOfPositions) || 0
          : numberOfPositions,
      gender: typeof gender === 'string' ? gender : String(gender) || '',
      education:
        typeof education === 'string' ? education : String(education) || '',
      age: typeof age === 'string' ? age : String(age) || '',
      preferred:
        preferred === '직접입력' ? customPreferred : String(preferred) || '',
    });
  }, [numberOfPositions, gender, education, age, preferred, customPreferred]);

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          모집인원 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={numberOfPositions}
          onChange={setNumberOfPositions}
          options={[0, 1, 2, 3, 4, 5]}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          성별 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={gender}
          onChange={setGender}
          options={['성별무관', '남성', '여성']}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          학력 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={education}
          onChange={setEducation}
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
          value={age}
          onChange={setAge}
          options={['연령무관', '20대', '30대', '40대 이상']}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          우대사항 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={preferred}
          onChange={setPreferred}
          options={['없음', '직접입력']}
          placeholder='선택'
        />

        {preferred === '직접입력' && (
          <textarea
            className='
            border-[0.5px] border-solid border-[var(--gray100)]
            bg-[var(--background200)] text-[var(--black400)]  text-[14px]
            w-full h-[110px] mt-[-4px] p-[14px] pb-[12px] rounded-[8px]'
            placeholder='우대사항을 작성해주세요.'
            value={customPreferred}
            onChange={(e) => setCustomPreferred(e.target.value)}
          />
        )}
      </FormGroup>
    </FormWrapper>
  );
}
