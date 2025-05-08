'use client';

import { ResponsiveStyle } from '@/styles/responsiveStyle';
import FilterContainer from './components/FilterContainer';
import HeadContainer from './components/HeadContainer';
import { useState } from 'react';
import ListContainer from './components/ListContainer';
import { useGetMyContents } from '@/hooks/query/useUser';
import Pagination from './components/Pagination';
import { useInfiniteScroll } from '@/utils/useInfiniteScroll';

export default function mypage() {
  const [selectedTab, setSelectedTab] = useState<'post' | 'comment'>('post');
  const [isPostSort, setIsPostSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');
  
  const query = useGetMyContents(selectedTab, isPostSort);
  const isPost = query.type === 'post';

  let listData = [];
  let isLoading = false;
  let isFetchingNextPage = false;
  let fetchNextPage, hasNextPage

  if (query.type === 'comment') {
    listData = query.data?.result ?? [];
    isLoading = query.isLoading;
  } else {
    listData = query.data?.pages.flatMap((page) => page.result) ?? [];
    isLoading = query.isLoading;
    fetchNextPage = query.fetchNextPage;
    hasNextPage = query.hasNextPage;
    isFetchingNextPage = query.isFetchingNextPage;
  }

  const observerRef = useInfiniteScroll(
    isPost && hasNextPage!,
    fetchNextPage!
  );

  return (
    <ResponsiveStyle>
      <HeadContainer />
      <FilterContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isPostSort={isPostSort}
        setIsPostSort={setIsPostSort}
      />
      <ListContainer selectedTab={selectedTab} listData={listData} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage}/>
      {selectedTab === 'post' && hasNextPage && <div ref={observerRef} style={{height:'1px'}}/>}
      {selectedTab === 'comment' && <Pagination />}
    </ResponsiveStyle>
  );
}
