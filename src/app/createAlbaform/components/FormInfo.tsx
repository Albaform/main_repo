'use client';

import { useForm, Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
  FormTextarea,
  ImageUploadWrapper,
  UploadBox,
  HiddenFileInput,
  PreviewWrapper,
  PreviewImage,
  DeleteButton,
} from './Form.styles';
import { CustomDateInput, StyledDatePickerWrapper } from './Datepicker.styles';

export type InfoFormValues = {
  title: string;
  description: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  imageUrls: string[];
};

type FormInfoProps = {
  onDataChange: (data: InfoFormValues) => void;
  initialValue: InfoFormValues;
};

export default function FormInfo({
  onDataChange,
  initialValue,
}: FormInfoProps) {
  const { register, control, watch, setValue } = useForm<InfoFormValues>({
    mode: 'onChange',
    defaultValues: initialValue,
  });

  const title = watch('title');
  const description = watch('description');
  const imageUrls = watch('imageUrls');

  const [recruitmentStartDate, setRecruitmentStartDate] = useState<Date | null>(
    initialValue.recruitmentStartDate
      ? new Date(initialValue.recruitmentStartDate)
      : null,
  );
  const [recruitmentEndDate, setRecruitmentEndDate] = useState<Date | null>(
    initialValue.recruitmentEndDate
      ? new Date(initialValue.recruitmentEndDate)
      : null,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<string[]>(
    initialValue.imageUrls || [],
  );

  // 이미지 업로드 시 미리보기 생성
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 4 - previews.length);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    const newUrls = [...previews, ...urls].slice(0, 4);
    setPreviews(newUrls);
    setValue('imageUrls', newUrls);
  };

  const handleDeleteImage = (index: number) => {
    const newUrls = [...previews];
    newUrls.splice(index, 1);
    setPreviews(newUrls);
    setValue('imageUrls', newUrls);
  };

  // 날짜 변경 시 폼에 업데이트
  useEffect(() => {
    if (recruitmentStartDate)
      setValue('recruitmentStartDate', recruitmentStartDate.toISOString());
    if (recruitmentEndDate)
      setValue('recruitmentEndDate', recruitmentEndDate.toISOString());
  }, [recruitmentStartDate, recruitmentEndDate, setValue]);

  // 폼 변경 시 상위에 전달
  useEffect(() => {
    onDataChange({
      title,
      description,
      recruitmentStartDate: recruitmentStartDate?.toISOString() || '',
      recruitmentEndDate: recruitmentEndDate?.toISOString() || '',
      imageUrls: imageUrls || [],
    });
  }, [
    title,
    description,
    recruitmentStartDate,
    recruitmentEndDate,
    imageUrls,
    onDataChange,
  ]);

  return (
    <FormWrapper>
      {/* 제목 */}
      <FormGroup>
        <FormLabel>
          알바폼 제목 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormInput
          type='text'
          placeholder='제목을 입력해주세요.'
          {...register('title')}
        />
      </FormGroup>

      {/* 소개글 */}
      <FormGroup>
        <FormLabel>
          소개글 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormTextarea
          placeholder='최대 200자까지 입력 가능합니다.'
          maxLength={200}
          {...register('description')}
        />
      </FormGroup>

      {/* 모집 기간 */}
      <FormGroup>
        <FormLabel>
          모집 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <Controller
          control={control}
          name='recruitmentStartDate'
          render={() => (
            <div className='relative'>
              <CustomDateInput
                ref={inputRef}
                readOnly
                value={
                  recruitmentStartDate && recruitmentEndDate
                    ? `${format(recruitmentStartDate, 'yyyy.MM.dd')} ~ ${format(
                        recruitmentEndDate,
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
                    startDate={recruitmentStartDate}
                    endDate={recruitmentEndDate}
                    onChange={(update: [Date | null, Date | null]) => {
                      setRecruitmentStartDate(update[0]);
                      setRecruitmentEndDate(update[1]);
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

      {/* 이미지 업로드 */}
      <FormGroup>
        <FormLabel>
          이미지 첨부 <RequiredMark>(최대 4장)</RequiredMark>
        </FormLabel>
        <ImageUploadWrapper>
          {previews.length < 4 && (
            <>
              <UploadBox htmlFor='imageUpload'>+</UploadBox>
              <HiddenFileInput
                id='imageUpload'
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
            </>
          )}
          {previews.map((url, index) => (
            <PreviewWrapper key={index}>
              <PreviewImage src={url} alt={`업로드된 이미지 ${index + 1}`} />
              <DeleteButton
                type='button'
                onClick={() => handleDeleteImage(index)}
              >
                ×
              </DeleteButton>
            </PreviewWrapper>
          ))}
        </ImageUploadWrapper>
      </FormGroup>
    </FormWrapper>
  );
}
