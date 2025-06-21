import Image from 'next/image';
import { ApplyFormLogicsProps } from '../../types';
import { useState } from 'react';

export default function FileInputContainer(props: ApplyFormLogicsProps) {
  const [resumeName, setResumeName] = useState('');

  const { form } = props;
  const { setValue, trigger, register, formState } = form;
  const { errors } = formState;

  return (
    <div className='mb-[50px]'>
      <p className='inline-block mb-4'>
        이력서 <span className='text-orange-400 ml-1'>*</span>
      </p>
      <label
        htmlFor='file-upload'
        className='flex justify-between w-full h-14 bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px] cursor-pointer text-gray-400'
      >
        <p>{resumeName === '' ? '파일 업로드하기' : resumeName}</p>
        <Image
          src='/images/createAlbaform/iconUpload.svg'
          alt='Upload'
          width={36}
          height={36}
        />
      </label>
      <input
        id='file-upload'
        accept='.pdf, .doc, .docx'
        {...register('resume', { required: true })}
        type='file'
        className='hidden'
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (!file) return;

          setResumeName(file.name);
          setValue('resume', file, {
            shouldDirty: true,
            shouldValidate: true,
          });
          trigger('resume');
        }}
      />
      {errors.resume?.message && (
        <p className='text-left mt-[10px] text-red'>{errors.resume?.message}</p>
      )}
    </div>
  );
}
