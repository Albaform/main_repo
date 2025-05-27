export default function EditProfileSkeleton() {
  return (
    <div className='animate-pulse space-y-6 pt-[30px] pb-[20px]'>
      <div className='w-[80px] h-[80px] rounded-[50%] bg-gray-300 justify-self-center'></div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <div className='h-4 bg-gray-300 rounded w-1/4 mb-2' />
          <div className='h-10 bg-gray-200 rounded' />
        </div>
      ))}
    </div>
  );
}
