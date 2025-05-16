'use client';

import { ResponsiveStyle } from '@/styles/responsiveStyle';
import FilterContainer from './components/FilterContainer';
import HeadContainer from '../components/HeadContainer';
import { useState } from 'react';
import MyPostAndCommentList from '../components/MyPostAndCommentList';
import { useGetMyContents } from '@/hooks/query/useUser';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import Pagination from '@/components/pagination/Pagination';
import { useModalController } from '@/hooks/common/useModalController';
import EditProfileModal from './components/modal/EditProfileModal';
import { getItemsPerPage } from '../utils/getItemsPerPage';

export default function Mypage() {
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'post' | 'comment'>('post');
  const [isPostSort, setIsPostSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  const itemsPerPage = getItemsPerPage();

  const query = useGetMyContents(page, itemsPerPage, selectedTab, isPostSort);
  const isPost = query.type === 'post';

  let listData = [];
  let isLoading = false;
  let isFetching = false;
  let isFetchingNextPage = false;
  let fetchNextPage, hasNextPage;

  let totalPages;

  if (query.type === 'comment') {
    listData = query.data?.result ?? [];
    isLoading = query.isLoading;
    isFetching = query.isFetching;
    totalPages = query.data?.totalPages;
  } else {
    listData = query.data?.pages.flatMap((page) => page.result) ?? [];
    isLoading = query.isLoading;
    fetchNextPage = query.fetchNextPage;
    hasNextPage = query.hasNextPage;
    isFetchingNextPage = query.isFetchingNextPage;
  }

  const observerRef = useInfiniteScroll(isPost && hasNextPage!, fetchNextPage!);

  const { showModal, setShowModal } = useModalController();

  return (
    <ResponsiveStyle>
      {showModal && (
        <EditProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <HeadContainer setShowModal={setShowModal} />
      <FilterContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isPostSort={isPostSort}
        setIsPostSort={setIsPostSort}
      />
      <MyPostAndCommentList
        selectedTab={selectedTab}
        listData={listData}
        isLoading={isLoading || isFetching}
        isFetchingNextPage={isFetchingNextPage}
      />
      {selectedTab === 'post' && hasNextPage && (
        <div ref={observerRef} style={{ height: '1px' }} />
      )}
      {selectedTab === 'comment' && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </ResponsiveStyle>
  );
}
