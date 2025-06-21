import { ApplyFormLogicsProps } from '../../types';

export default function TextareaContainer(props: ApplyFormLogicsProps) {
  const { form, handleDraftChange } = props;
  const { register, formState } = form;
  const { onChange, ...rest } = register('introduction');
  const { errors } = formState;

  return (
    <div className='mb-[50px]'>
      <label htmlFor='introduction' className='inline-block mb-4'>
        자기소개 <span className='text-orange-400 ml-1'>*</span>
      </label>
      <textarea
        id='introduction'
        {...rest}
        name='introduction'
        onChange={(e) => {
          onChange(e);
          handleDraftChange?.(e);
        }}
        placeholder='최대 200자까지 입력 가능합니다.'
        className='w-full h-[calc(100vw_*_(160/640))] max-h-[260px] min-h-[160px] bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px]'
      />
      {errors.introduction?.message && (
        <p className='text-left mt-[10px] text-red'>
          {errors.introduction?.message}
        </p>
      )}
    </div>
  );
}
