import Image from 'next/image';
import { ApplyFormLogicsProps } from '../../types';

export default function ButtonContainer(props: ApplyFormLogicsProps) {
  const { form, isPending, handleDraftSave } = props;
  const { formState } = form;
  const { isValid } = formState;

  return (
    <div className='flex items-center gap-x-2'>
      <button
        type='button'
        className='flex-[1] h-14 px-6 border border-solid border-line-100 text-center text-gray-400 rounded-[8px]'
        onClick={handleDraftSave}
      >
        임시 저장
      </button>
      <button
        className='flex-[1] h-14 px-6 text-center bg-orange-400 text-white rounded-[8px] disabled:bg-gray-300 disabled:cursor-not-allowed text-center justify-items-center'
        disabled={!isValid || isPending}
      >
        {isPending ? (
          <Image
            src='/images/buttonLoader.gif'
            alt='Loading'
            width={50}
            height={20}
          />
        ) : (
          '작성 완료'
        )}
      </button>
    </div>
  );
}
