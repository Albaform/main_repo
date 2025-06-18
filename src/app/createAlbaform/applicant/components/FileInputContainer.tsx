import Image from 'next/image';

export default function FileInputContainer() {
  return (
    <>
      <p className='inline-block mb-4'>
        이력서 <span className='text-orange-400 ml-1'>*</span>
      </p>
      <label
        htmlFor='file-upload'
        className='flex justify-between w-full h-14 mb-[50px] bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px] cursor-pointer text-gray-400'
      >
        <p>파일 업로드하기</p>
        <Image
          src='/images/createAlbaform/iconUpload.svg'
          alt='Upload'
          width={36}
          height={36}
        />
      </label>
      <input
        id='file-upload'
        name='file'
        accept='.pdf'
        type='file'
        className='hidden'
      />
    </>
  );
}
