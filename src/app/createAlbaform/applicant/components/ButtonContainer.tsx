export default function ButtonContainer() {
  return (
    <div className='flex items-center gap-x-2'>
      <button
        type='button'
        className='flex-[1] h-14 px-6 border border-solid border-line-100 text-center text-gray-400 rounded-[8px]'
      >
        임시 저장
      </button>
      <button className='flex-[1] h-14 px-6 text-center bg-orange-400 text-white rounded-[8px] disabled:bg-gray-300'>
        작성 완료
      </button>
    </div>
  );
}
