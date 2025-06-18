export default function TextareaContainer() {
  return (
    <>
      <label htmlFor='introduction' className='inline-block mb-4'>
        자기소개 <span className='text-orange-400 ml-1'>*</span>
      </label>
      <textarea
        id='introduction'
        name='introduction'
        placeholder='최대 200자까지 입력 가능합니다.'
        className='w-full h-[calc(100vw_*_(160/640))] max-h-[260px] min-h-[160px] mb-[50px] bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px]'
      />
    </>
  );
}
