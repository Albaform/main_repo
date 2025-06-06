import Image from 'next/image';

export default function PostFormInputs() {
  return (
    <>
      <div className='mt-[70px] mb-[40px] max-md:mt-[32px]'>
        <label
          htmlFor='title'
          className='block text-black300 font-medium mb-[15px]'
        >
          제목
          <span className='text-orange-400 relative top-[1px] ml-[3px]'>*</span>
        </label>
        <input
          id='title'
          type='text'
          placeholder='제목을 입력해주세요'
          maxLength={100}
          className='w-full bg-background-200 rounded-[8px] p-[14px]'
        />
      </div>
      <div className='mb-[40px]'>
        <label
          htmlFor='description'
          className='block text-black300 font-medium mb-[15px]'
        >
          내용
          <span className='text-orange-400 relative top-[1px] ml-[3px]'>*</span>
        </label>
        <textarea
          id='description'
          placeholder='내용을 입력해주세요'
          className='w-full h-[240px] bg-background-200 rounded-[8px] p-[14px] max-md:h-[200px] max-xs:h-[180px]'
        />
      </div>
      <div>
        <p className='text-black300 font-medium mb-[15px]'>이미지</p>
        <label
          htmlFor='file-upload'
          className='block w-[240px] h-[240px] rounded-[8px] bg-background-200 max-md:w-[160px] max-md:h-[160px] text-center place-content-center cursor-pointer'
        >
          <Image
            src='/images/iconUpload.svg'
            alt='Upload'
            width={36}
            height={36}
            className='justify-self-center'
          />
          <p className='font-light text-gray-500'>이미지 넣기</p>
        </label>
        <input id='file-upload' type='file' className='hidden' />
      </div>
    </>
  );
}
