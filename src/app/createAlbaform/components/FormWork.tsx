'use client';

import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { FormWrapper, FormGroup, FormLabel, RequiredMark } from './Form.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { CustomDateInput, StyledDatePickerWrapper } from './Datepicker.styles';

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
    </FormWrapper>
  );
}
