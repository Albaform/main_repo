'use client';

import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
  DateButton,
} from './Form.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { CustomDateInput, StyledDatePickerWrapper } from './Datepicker.styles';
import { openKakaoAddress } from '@/utils/openKakaoAddress';

export interface WorkFormValues {
  location: string;
  workStartDate: string;
  workEndDate: string;
  workStartTime: string; // "09:00" 또는 "string" 형태로 시간 포맷 필요
  workEndTime: string; // "09:00" 또는 "string" 형태로 시간 포맷 필요
  workDays: string[];
  isNegotiableWorkDays: boolean;
  hourlyWage: number;
  isPublic: boolean;
}

interface FormWorkProps {
  onDataChange: (data: WorkFormValues) => void;
  initialValue: WorkFormValues;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function FormWork({
  onDataChange,
  initialValue,
}: FormWorkProps) {
  const { register, control, watch, setValue } = useForm<WorkFormValues>({
    mode: 'onChange',
    defaultValues: initialValue,
  });

  const [workStartDate, setWorkStartDate] = useState<Date | null>(
    initialValue.workStartDate ? new Date(initialValue.workStartDate) : null,
  );
  const [workEndDate, setWorkEndDate] = useState<Date | null>(
    initialValue.workEndDate ? new Date(initialValue.workEndDate) : null,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // 선택 날짜
  const handleClick = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  // 날짜 변경 시 폼에 업데이트
  useEffect(() => {
    if (workStartDate) setValue('workStartDate', workStartDate.toISOString());
    if (workEndDate) setValue('workEndDate', workEndDate.toISOString());
  }, [workStartDate, workEndDate, setValue]);

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
          {...register('location')}
          onClick={() =>
            openKakaoAddress((address) =>
              setValue('location', address, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              }),
            )
          }
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          근무 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <Controller
          control={control}
          name='workStartDate'
          render={() => (
            <div className='relative'>
              <CustomDateInput
                ref={inputRef}
                readOnly
                value={
                  workStartDate && workEndDate
                    ? `${format(workStartDate, 'yyyy.MM.dd')} ~ ${format(
                        workEndDate,
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
                    startDate={workStartDate}
                    endDate={workEndDate}
                    onChange={(update: [Date | null, Date | null]) => {
                      setWorkStartDate(update[0]);
                      setWorkEndDate(update[1]);
                    }}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    inline
                  />
                </StyledDatePickerWrapper>
              )}
            </div>
          )}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          근무 시간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <div className='flex justify-center items-center gap-8'>
          <FormInput type='time' {...register('workStartTime')} />
          <FormInput type='time' {...register('workEndTime')} />
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          근무 요일 <RequiredMark>*</RequiredMark>
        </FormLabel>
        {days.map((day) => (
          <DateButton
            key={day}
            type='button'
            onClick={() => handleClick(day)}
            className={selectedDays.includes(day) ? 'selected' : ''}
          >
            {day}
          </DateButton>
        ))}
      </FormGroup>
    </FormWrapper>
  );
}
