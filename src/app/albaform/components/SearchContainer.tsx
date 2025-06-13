import Image from 'next/image';
import { SearchContainerProps } from '../types';

export default function SearchContainer({ setKeyword }: SearchContainerProps) {
  const handleEnterSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('search') as string;

    setKeyword(keyword);
  };

  return (
    <div className='flex justify-between items-center max-xs:flex-col max-xs:items-stretch'>
      <form onSubmit={handleEnterSearch} className='flex-[1]'>
        <div className='flex bg-background-200 rounded-[24px] px-[24px] py-[14px] max-md:px-[14px] w-1/2 max-md:w-full'>
          <Image
            src='/images/iconSearch.svg'
            alt='검색'
            width={36}
            height={36}
          />
          <input
            name='search'
            type='text'
            placeholder='어떤 알바를 찾고 계세요?'
            className='ml-[8px] bg-background-200 text-[20px] w-full max-md:text-[16px] max-md:ml-[2px]'
          />
        </div>
      </form>
    </div>
  );
}
