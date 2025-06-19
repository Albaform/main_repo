import Image from 'next/image';
import { ApplyFormLogicsProps } from '../../types';

export default function FileInputContainer(props: ApplyFormLogicsProps) {
  const { form } = props;
  const { setValue, trigger, watch, register, formState } = form;
  const { errors } = formState;

  const resumeValue = watch('resume');

  return (
    <div className='mb-[50px]'>
      <p className='inline-block mb-4'>
        이력서 <span className='text-orange-400 ml-1'>*</span>
      </p>
      <label
        htmlFor='file-upload'
        className='flex justify-between w-full h-14 bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px] cursor-pointer text-gray-400'
      >
        <p>{resumeValue?.length > 0 ? resumeValue : '파일 업로드하기'}</p>
        <Image
          src='/images/createAlbaform/iconUpload.svg'
          alt='Upload'
          width={36}
          height={36}
        />
      </label>
      <input
        id='file-upload'
        accept='.pdf'
        {...register('resume')}
        type='file'
        className='hidden'
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (!file) return;

          setValue('resume', file.name, {
            shouldDirty: true,
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
