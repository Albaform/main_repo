'use client';

import { ResponsiveStyle } from '@/styles/responsiveStyle';
import FilterContainer from './components/FilterContainer';
import HeadContainer from '../components/HeadContainer';
import { useState } from 'react';
import MyPostAndCommentList from '../components/MyPostAndCommentList';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import Pagination from '@/components/pagination/Pagination';
import { useModalController } from '@/hooks/common/useModalController';
import { getItemsPerPage } from '../utils/getItemsPerPage';
import { useGetMyContents } from '@/hooks/query/useGetMyContents';
import Toast from '@/components/tooltip/Toast';
import EditProfileModal from '../components/modal/EditProfile/EditProfileModal';
import EditPasswordModal from '../components/modal/EditPassword/EditPasswordModal';

export default function Mypage() {
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'post' | 'comment'>('post');
  const [isPostSort, setIsPostSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');
  const [modalType, setModalType] = useState<'editUser' | 'editPassword'>(
    'editUser',
  );
  const [showToast, setShowToast] = useState(false);
  
  const { showModal, setShowModal } = useModalController();

  const itemsPerPage = getItemsPerPage();
  
  let listData = [];
  let isLoading = false;
  let isFetching = false;
  let isFetchingNextPage = false;
  let fetchNextPage, hasNextPage;
  let totalPages;

  const query = useGetMyContents(page, itemsPerPage, selectedTab, isPostSort);
  const isPost = query.type === 'post';
  
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

  const handleOpenModal = (type: 'editUser' | 'editPassword') => {
    setShowModal(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('editUser');
  };

  const handleEditSuccess = () => {
    setShowToast(true);
  };

  return (
    <ResponsiveStyle>
      {showModal && modalType === 'editUser' ? (
        <EditProfileModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          onSuccess={handleEditSuccess}
        />
      ) : showModal && modalType === 'editPassword' ? (
        <EditPasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          onSuccess={handleEditSuccess}
        />
      ) : (
        ''
      )}
      <HeadContainer handleOpenModal={handleOpenModal} />
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
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          {modalType === 'editUser'
            ? '회원 정보'
            : modalType === 'editPassword'
            ? '비밀번호'
            : ''}
          가 성공적으로 수정되었습니다 !
        </Toast>
      )}
    </ResponsiveStyle>
  );
}
