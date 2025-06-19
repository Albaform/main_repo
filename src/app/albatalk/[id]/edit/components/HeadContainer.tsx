import { useRouter } from 'next/navigation';
import { FormLogicsProps } from '../../../types';

export default function HeadContainer(props: FormLogicsProps) {
  const router = useRouter();

  const { form, isModified, isPending } = props;
  const { formState } = form;
  const { isValid } = formState;

  return (
    <div className='flex items-center justify-between mt-[40px] pb-[35px] border-b border-solid border-line-100 max-md:pb-[18px] max-xs:pb-[16px]'>
      <p className='font-semibold text-[32px] max-md:text-[20px] max-xs:text-[18px]'>
        글쓰기
      </p>
      <div className='flex items-center max-xs:flex-col max-xs:fixed max-xs:bottom-[calc(10px+theme(spacing.safe-bottom))] max-xs:left-[0] max-xs:right-[0] max-xs:px-[24px] max-xs:pt-[15px] max-xs:border-t border-solid border-line-200 max-xs:bg-white'>
        <button
          type='button'
          className='w-[180px] h-[58px] bg-gray-200 text-white text-center font-medium rounded-[8px] mr-[12px] max-xs:mr-[0] max-xs:w-full max-xs:mb-[5px] max-md:w-[108px] max-md:h-[46px] max-xs:h-[58px]'
          onClick={() => router.push('/albatalk')}
        >
          취소
        </button>
        <button
          className='w-[180px] h-[58px] bg-orange-400 text-white text-center font-medium rounded-[8px] max-xs:w-full max-md:w-[108px] max-md:h-[46px] max-xs:h-[58px] disabled:bg-gray-400 disabled:cursor-not-allowed'
          disabled={!isValid || isPending || !isModified}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
