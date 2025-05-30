'use client';

import FilterContainer from './components/FilterContainer';
import { useState } from 'react';
import { FilterResponsive, ListResponsive } from './styles';
import ContentsList from './components/ContentsList';
import FloatingButton from './components/FloatingButton';
import { getItemsPerPage } from './utils/getItemsPerPage';
import { useGetPosts } from '@/hooks/query/useGetPosts';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';

export default function AlbaTalk() {
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');
  const [isKeyword, setIsKeyword] = useState('');

  const itemsPerPage = getItemsPerPage();

  const {
    data: postsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetPosts(itemsPerPage, isSort, isKeyword);

  const listData = postsData?.pages.flatMap((page) => page.result) ?? [];

  const observerRef = useInfiniteScroll(isSort && hasNextPage!, fetchNextPage!);

  return (
    <>
      <div className='border-solid border-b-[1px] border-line-100 max-xs:border-b-[0px]'>
        <FilterResponsive>
          <FilterContainer isSort={isSort} setIsSort={setIsSort} setIsKeyword={setIsKeyword}/>
        </FilterResponsive>
      </div>
      <ListResponsive>
        <ContentsList
          listData={listData}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </ListResponsive>
      <FloatingButton />
      {hasNextPage && <div ref={observerRef} style={{ height: '1px' }} />}
    </>
  );
}
