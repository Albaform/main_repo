'use client';

import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
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
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialValue.workDays || [],
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNegotiable, setIsNegotiable] = useState(
    initialValue.isNegotiableWorkDays || false,
  );
  const [isPublic, setIsPublic] = useState(initialValue.isPublic || false);

  useEffect(() => {
    setSelectedDays(initialValue.workDays || []);
    setIsNegotiable(initialValue.isNegotiableWorkDays || false);
    setWorkStartDate(
      initialValue.workStartDate ? new Date(initialValue.workStartDate) : null,
    );
    setWorkEndDate(
      initialValue.workEndDate ? new Date(initialValue.workEndDate) : null,
    );
    setIsPublic(initialValue.isPublic || false);
  }, [
    initialValue.workDays,
    initialValue.isNegotiableWorkDays,
    initialValue.workStartDate,
    initialValue.workEndDate,
    initialValue.isPublic,
  ]);

  useEffect(() => {
    setValue('workDays', selectedDays, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [selectedDays, setValue]);
  useEffect(() => {
    setValue('isNegotiableWorkDays', isNegotiable, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [isNegotiable, setValue]);
  useEffect(() => {
    setValue('isPublic', isPublic, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [isPublic, setValue]);
  useEffect(() => {
    if (workStartDate) setValue('workStartDate', workStartDate.toISOString());
    if (workEndDate) setValue('workEndDate', workEndDate.toISOString());
  }, [workStartDate, workEndDate, setValue]);

  // 부모로 데이터 전달 - "진짜로 값이 바뀔 때만"
  const formValues = watch();
  const prevFormValuesRef = useRef(formValues);
  useEffect(() => {
    if (
      JSON.stringify(prevFormValuesRef.current) !== JSON.stringify(formValues)
    ) {
      onDataChange(formValues);
      prevFormValuesRef.current = formValues;
    }
  }, [formValues, onDataChange]);

  // 각 체크박스 핸들러
  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNegotiable(e.target.checked);
  };
  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
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
        <DayCheckButton
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
        <Checkbox
          checked={isNegotiable}
          onChange={handleNegotiableChange}
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
            {...register('hourlyWage')}
          />
          <span>원</span>
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          공개 설정 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <Checkbox
          checked={isPublic}
          onChange={handlePublicChange}
          label='공개'
          id='public-checkbox'
        />
      </FormGroup>
    </FormWrapper>
  );
}
