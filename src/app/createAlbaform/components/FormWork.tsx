'use client';

import React, { useState } from 'react';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
} from './Form.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { CustomDateInput, StyledDatePickerWrapper } from './Datepicker.styles';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import DayCheckButton from './DayCheckButton';
import Checkbox from './CheckBox';

export interface WorkFormValues {
  location: string;
  workStartDate: string;
  workEndDate: string;
  workStartTime: string;
  workEndTime: string;
  workDays: string[];
  isNegotiableWorkDays: boolean;
  hourlyWage: number;
  isPublic: boolean;
}

interface FormWorkProps {
  onDataChange: (data: WorkFormValues) => void;
  initialValue: WorkFormValues;
}

export default function FormWork({
  onDataChange,
  initialValue,
}: FormWorkProps) {
  const [form, setForm] = useState<WorkFormValues>(initialValue);
  const [workDates, setWorkDates] = useState<[Date | null, Date | null]>([
    form.workStartDate ? new Date(form.workStartDate) : null,
    form.workEndDate ? new Date(form.workEndDate) : null,
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 값 변경 시 form + 부모 동기화
  const handleChange = (key: keyof WorkFormValues, value: any) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    onDataChange(newForm);
  };

  // 날짜 변경
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setWorkDates(dates);
    const newForm = {
      ...form,
      workStartDate: dates[0]?.toISOString() || '',
      workEndDate: dates[1]?.toISOString() || '',
    };
    setForm(newForm);
    onDataChange(newForm);
  };

  // 요일 선택
  const handleDaysChange = (days: string[]) => {
    handleChange('workDays', days);
  };

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          근무위치 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormInput
          type='text'
          placeholder='근무위치를 입력해주세요.'
          readOnly
          value={form.location}
          onClick={() =>
            openKakaoAddress((address) => handleChange('location', address))
          }
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          근무 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <div className='relative'>
          <CustomDateInput
            readOnly
            value={
              workDates[0] && workDates[1]
                ? `${format(workDates[0], 'yyyy.MM.dd')} ~ ${format(
                    workDates[1],
                    'yyyy.MM.dd',
                  )}`
                : ''
            }
            placeholder='시작일 ~ 종료일'
            onClick={() => setIsCalendarOpen(true)}
          />
          {isCalendarOpen && (
            <StyledDatePickerWrapper>
              <DatePicker
                locale={ko}
                selectsRange
                startDate={workDates[0]}
                endDate={workDates[1]}
                onChange={handleDateChange}
                onClickOutside={() => setIsCalendarOpen(false)}
                inline
              />
            </StyledDatePickerWrapper>
          )}
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          근무 시간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <div className='flex justify-center items-center gap-8'>
          <FormInput
            type='time'
            value={form.workStartTime}
            onChange={(e) => handleChange('workStartTime', e.target.value)}
          />
          <FormInput
            type='time'
            value={form.workEndTime}
            onChange={(e) => handleChange('workEndTime', e.target.value)}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          근무 요일 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <DayCheckButton
          selectedDays={form.workDays}
          setSelectedDays={handleDaysChange}
        />
        <Checkbox
          checked={form.isNegotiableWorkDays}
          onChange={(e) =>
            handleChange('isNegotiableWorkDays', e.target.checked)
          }
          label='요일 협의 가능'
          id='negotiable-checkbox'
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          시급 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <div className='flex items-center gap-2'>
          <FormInput
            type='text'
            placeholder='시급을 입력해주세요.'
            value={form.hourlyWage}
            onChange={(e) => handleChange('hourlyWage', e.target.value)}
          />
          <span>원</span>
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          공개 설정 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <Checkbox
          checked={form.isPublic}
          onChange={(e) => handleChange('isPublic', e.target.checked)}
          label='공개'
          id='public-checkbox'
        />
      </FormGroup>
    </FormWrapper>
  );
}
