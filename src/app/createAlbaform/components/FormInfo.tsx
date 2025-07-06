'use client';

import { useState, useEffect } from 'react';
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
import { useUploadImage } from '@/hooks/mutation/useUploadImage';

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
  // 단일 form state로 통합
  const [form, setForm] = useState<InfoFormValues>(initialValue);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [recruitmentDates, setRecruitmentDates] = useState<
    [Date | null, Date | null]
  >([
    initialValue.recruitmentStartDate
      ? new Date(initialValue.recruitmentStartDate)
      : null,
    initialValue.recruitmentEndDate
      ? new Date(initialValue.recruitmentEndDate)
      : null,
  ]);
  const [previews, setPreviews] = useState<string[]>(
    initialValue.imageUrls || [],
  );
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    setForm(initialValue);
    setRecruitmentDates([
      initialValue.recruitmentStartDate
        ? new Date(initialValue.recruitmentStartDate)
        : null,
      initialValue.recruitmentEndDate
        ? new Date(initialValue.recruitmentEndDate)
        : null,
    ]);
    setPreviews(initialValue.imageUrls || []);
  }, [initialValue]);

  const handleChange = (key: keyof InfoFormValues, value: any) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    onDataChange(newForm);
  };

  // 날짜 변경
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDates(dates);
    setForm((prev) => ({
      ...prev,
      recruitmentStartDate: dates[0]?.toISOString() ?? '',
      recruitmentEndDate: dates[1]?.toISOString() ?? '',
    }));
  };

  useEffect(() => {
    if (
      form.recruitmentStartDate !== initialValue.recruitmentStartDate ||
      form.recruitmentEndDate !== initialValue.recruitmentEndDate ||
      form.title !== initialValue.title ||
      form.description !== initialValue.description ||
      JSON.stringify(form.imageUrls) !== JSON.stringify(initialValue.imageUrls)
    ) {
      onDataChange(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // 이미지 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files).slice(0, 4 - previews.length);
    try {
      const uploadedUrls = await Promise.all(
        fileArray.map((file) => uploadImageMutation.mutateAsync(file)),
      );
      const newUrls = [...previews, ...uploadedUrls].slice(0, 4);
      setPreviews(newUrls);
      handleChange('imageUrls', newUrls);
    } catch (err) {
      alert('이미지 업로드 실패');
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    const newUrls = [...previews];
    newUrls.splice(index, 1);
    setPreviews(newUrls);
    handleChange('imageUrls', newUrls);
  };

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
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
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
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormGroup>
      {/* 모집 기간 */}
      <FormGroup>
        <FormLabel>
          모집 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <div className='relative'>
          <CustomDateInput
            readOnly
            value={
              recruitmentDates[0] && recruitmentDates[1]
                ? `${format(recruitmentDates[0], 'yyyy.MM.dd')} ~ ${format(
                    recruitmentDates[1],
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
                startDate={recruitmentDates[0]}
                endDate={recruitmentDates[1]}
                onChange={handleDateChange}
                onClickOutside={() => setIsCalendarOpen(false)}
                inline
              />
            </StyledDatePickerWrapper>
          )}
        </div>
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
