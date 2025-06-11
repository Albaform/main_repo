export default function EditProfileSkeleton({
  pathOwner,
}: {
  pathOwner: boolean;
}) {
  return (
    <div className='animate-pulse space-y-6 pt-[30px] pb-[20px]'>
      <div className='w-[80px] h-[80px] rounded-[50%] bg-gray-300 justify-self-center'></div>
      {pathOwner
        ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className='h-4 bg-gray-300 rounded w-1/4 mb-2' />
              <div className='h-10 bg-gray-200 rounded' />
            </div>
          ))
        : Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className='h-4 bg-gray-300 rounded w-1/4 mb-2' />
              <div className='h-10 bg-gray-200 rounded' />
            </div>
          ))}
      <div className='flex gap-[3%]'>
        <div className='w-1/2 h-[50px] bg-gray-300 rounded-[8px]'></div>
        <div className='w-1/2 h-[50px] bg-gray-300 rounded-[8px]'></div>
      </div>
    </div>
  );
}
