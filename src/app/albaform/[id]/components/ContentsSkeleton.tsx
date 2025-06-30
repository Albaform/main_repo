export default function ContentsSkeleton() {
  return (
    <>
      <div className='mt-4 space-y-4'>
        <div className='w-1/2 h-5 bg-gray-200 rounded origin-left animate-pulseStretchLeft delay-0 max-md:w-2/3' />
        <div className='w-3/4 h-5 bg-gray-300 rounded origin-left animate-pulseStretchLeft delay-200 max-md:w-5/6' />
        <div className='w-4/6 h-5 bg-gray-200 rounded origin-left animate-pulseStretchLeft delay-400 max-md:w-6/7' />
      </div>
      <div className='flex gap-[2%] flex-wrap animate-pulse mt-10'>
        <div className='flex-[1] h-12 min-w-[49%] rounded bg-gray-300' />
        <div className='flex-[1] h-12 min-w-[49%] rounded bg-gray-300' />
        <div className='flex-[1] h-12 min-w-[49%] rounded bg-gray-300 mt-[2%]' />
        <div className='flex-[1] h-12 min-w-[49%] rounded bg-gray-300 mt-[2%]' />
      </div>
      <div className='mt-[50px] space-y-4'>
        <div className='w-1/2 h-5 bg-gray-200 rounded origin-left animate-pulseStretchLeftReserve delay-0' />
      </div>
      <div className='mt-[50px] space-y-4'>
        <div className='w-[70%] h-5 bg-gray-200 rounded origin-left animate-pulseStretchLeft delay-0 max-md:w-2/3' />
        <div className='w-full h-5 bg-gray-300 rounded origin-left animate-pulseStretchLeft delay-200 max-md:w-5/6' />
        <div className='w-2/4 h-5 bg-gray-200 rounded origin-left animate-pulseStretchLeft delay-400 max-md:w-6/7' />
      </div>
    </>
  );
}
