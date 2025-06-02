export default function DetailSkeleton() {
  return (
    <div className='animate-pulse space-y-6 pt-[48px] pb-[30px]'>
      <div className='h-10 bg-gray-200 rounded w-2/5'></div>
      <div>
        <div className='h-4 bg-gray-300 rounded w-1/6 mb-2' />
        <div className='w-1/2 h-[150px] bg-gray-200 rounded mt-[50px]' />
        <div className='mt-[10px] h-5 bg-gray-300 rounded w-4/5'></div>
        <div className='mt-[10px] h-5 bg-gray-200 rounded w-2/5'></div>
        <div className='mt-[10px] h-5 bg-gray-300 rounded w-3/5'></div>
      </div>
    </div>
  );
}
