export default function BannerSkeleton() {
  return (
    <div className='animate-pulse space-y-6 rounded-[8px] overflow-hidden max-lg:rounded-[0] h-[calc(100vw_*_(562/1902))] max-lg:h-[calc(100vw_*_(260/744))] max-md:h-[calc(100vw_*_(260/375))]'>
      <div className='h-full bg-gray-300' />
    </div>
  );
}
