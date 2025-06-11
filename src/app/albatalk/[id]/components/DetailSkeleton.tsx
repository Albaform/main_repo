import { SkeletonProps } from '../types';

export default function DetailSkeleton({ $comment }: SkeletonProps) {
  return (
    <>
      {$comment ? (
        <div className='animate-pulse space-y-6 pb-[30px]'>
          <div>
            <div className='mt-[10px] h-5 bg-gray-200 rounded w-2/5' />
            <div className='mt-[20px] h-5 bg-gray-300 rounded w-3/5' />
          </div>
          <div className='pt-[20px]'>
            <div className='mt-[10px] h-5 bg-gray-200 rounded w-2/5' />
            <div className='mt-[20px] h-5 bg-gray-300 rounded w-3/5' />
          </div>
        </div>
      ) : (
        <div className='animate-pulse space-y-6 pt-[48px] pb-[30px]'>
          <div className='h-10 bg-gray-200 rounded w-2/5' />
          <div>
            <div className='h-4 bg-gray-300 rounded w-1/6 mb-2' />
            <div className='w-1/2 h-[150px] bg-gray-200 rounded mt-[50px]' />
            <div className='mt-[10px] h-5 bg-gray-300 rounded w-4/5' />
            <div className='mt-[10px] h-5 bg-gray-200 rounded w-2/5' />
            <div className='mt-[10px] h-5 bg-gray-300 rounded w-3/5' />
          </div>
          <div className='flex items-center pt-[50px] pb-[15px] border-b border-solid border-line-200'>
            <div className='mt-[10px] bg-gray-300 rounded-full w-[83px] h-[39px] mr-[10px]' />
            <div className='mt-[10px] bg-gray-300 rounded-full w-[83px] h-[39px]' />
          </div>
          <div className='flex-col place-items-end'>
            <div className='w-full h-[150px] rounded-[8px] bg-gray-200' />
            <div className='w-[210px] h-[65px] rounded-[8px] bg-gray-300 mt-[15px]' />
          </div>
          <div className='mt-[50px]'>
            <div className='mt-[10px] h-5 bg-gray-200 rounded w-2/5' />
            <div className='mt-[20px] h-5 bg-gray-300 rounded w-3/5' />
            <div className='mt-[50px] h-5 bg-gray-200 rounded w-2/5' />
            <div className='mt-[20px] h-5 bg-gray-300 rounded w-3/5' />
          </div>
        </div>
      )}
    </>
  );
}
