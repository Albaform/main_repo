import useChangeProfilePreview from '@/hooks/common/useChangeProfilePreview';
import Image from 'next/image';
import { FormLogisProps } from '../../../types';

export default function PostFormInputs(props: FormLogisProps) {
  const { form, postByIdData, setSelectedImageFile } = props;

  const { register, formState, setValue, trigger } = form;
  const { errors } = formState;

  const { title, content, imageUrl: currentImageUrl } = postByIdData ?? {};

  const { isPreview, setIsPreview, handleImgChange } = useChangeProfilePreview(
    currentImageUrl || '',
  );

  return (
    <>
      <div className='mt-[70px] mb-[40px] max-md:mt-[32px]'>
        <label
          htmlFor='title'
          className='block text-black300 font-medium mb-[15px]'
        >
          제목
          <span className='text-orange-400 relative top-[1px] ml-[3px]'>*</span>
        </label>
        <input
          {...register('title')}
          id='title'
          type='text'
          defaultValue={title}
          placeholder='제목을 입력해주세요'
          maxLength={100}
          className='w-full bg-background-200 rounded-[8px] p-[14px]'
        />
        {errors.title && (
          <p className='text-left mt-[10px] text-red'>{errors.title.message}</p>
        )}
      </div>
      <div className='mb-[40px]'>
        <label
          htmlFor='description'
          className='block text-black300 font-medium mb-[15px]'
        >
          내용
          <span className='text-orange-400 relative top-[1px] ml-[3px]'>*</span>
        </label>
        <textarea
          id='description'
          {...register('description')}
          defaultValue={content}
          placeholder='내용을 입력해주세요'
          className='w-full h-[240px] bg-background-200 rounded-[8px] p-[14px] max-md:h-[200px] max-xs:h-[180px]'
        />
        {errors.description && (
          <p className='text-left mt-[5px] text-red'>
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <p className='text-black300 font-medium mb-[15px]'>이미지</p>
        {isPreview ? (
          <div className='relative w-fit'>
            <div className='relative w-[240px] h-[240px] rounded-[8px] max-md:w-[160px] max-md:h-[160px] border border-solid border-line-200 overflow-hidden'>
              <Image
                src={isPreview}
                alt='썸네일'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <Image
              src='/images/closePreview.svg'
              alt='X'
              width={24}
              height={24}
              className='absolute z-[100] top-[-5px] right-[-5px] cursor-pointer'
              onClick={() => {
                setIsPreview('');
                setSelectedImageFile?.(null);
                setValue('imageUrl', '', {
                  shouldDirty: true,
                });
                trigger('imageUrl');
              }}
            />
          </div>
        ) : (
          <label
            htmlFor='file-upload'
            className='block w-[240px] h-[240px] rounded-[8px] bg-background-200 max-md:w-[160px] max-md:h-[160px] text-center place-content-center cursor-pointer'
          >
            <Image
              src='/images/iconUpload.svg'
              alt='Upload'
              width={36}
              height={36}
              className='justify-self-center'
            />
            <p className='font-light text-gray-500'>이미지 넣기</p>
          </label>
        )}
        <input
          id='file-upload'
          type='file'
          accept='image/png, image/jpg'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            handleImgChange(e);
            setSelectedImageFile?.(file!);
            setValue('imageUrl', file ? file.name : '', {
              shouldDirty: true,
            });
            trigger('imageUrl');
          }}
        />
      </div>
    </>
  );
}
