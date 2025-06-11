import Image from 'next/image';
import { FilterContainerProps } from '../types';
import PostSortButton from '@/components/postSort/PostSortButton';
import React from 'react';

export default function FilterContainer({
  isSort,
  setIsSort,
  setIsKeyword,
}: FilterContainerProps) {
  const handleEnterSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('search') as string;

    setIsKeyword(keyword);
  };

  return (
    <div className='flex justify-between items-center max-xs:flex-col max-xs:items-stretch'>
      <form onSubmit={handleEnterSearch} className='flex-[1]'>
        <div className='flex bg-background-200 rounded-[24px] px-[24px] py-[14px] max-md:px-[14px] max-xs:mb-[16px]'>
          <Image
            src='/images/iconSearch.svg'
            alt='검색'
            width={36}
            height={36}
          />
          <input
            name='search'
            type='text'
            placeholder='궁금한 점을 검색해보세요'
            className='ml-[8px] bg-background-200 text-[20px] w-full max-md:text-[16px] max-md:ml-[2px]'
          />
        </div>
      </form>
      <div className='flex-[.2] justify-items-end'>
        <PostSortButton isSort={isSort} setIsSort={setIsSort} />
      </div>
    </div>
  );
}
