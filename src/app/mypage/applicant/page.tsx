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
import EditProfileModal from '../components/modal/editProfile/EditProfileModal';
import EditPasswordModal from '../components/modal/editPassword/EditPasswordModal';

export default function Mypage() {
  const [postId, setPostId] = useState<number>();
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'post' | 'comment' | 'scrap'>(
    'post',
  );
  const [isPostSort, setIsPostSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');
  const [isScrapSort, setIsScrapSort] = useState<
    'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
  >('mostRecent');
  const [isPublic, setIsPublic] = useState(true);
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const {
    showModal,
    setShowModal,
    mainMessage,
    setMainMessage,
    subMessage,
    setSubMessage,
    modalType,
    setModalType,
  } = useModalController();

  const itemsPerPage = getItemsPerPage();

  let listData = [];
  let isLoading = false;
  let isFetching = false;
  let isFetchingNextPage = false;
  let fetchNextPage, hasNextPage;
  let totalPages;

  const query = useGetMyContents(
    page,
    itemsPerPage,
    selectedTab,
    isPostSort,
    isScrapSort,
    isPublic,
    isRecruiting,
  );
  const isPost = query.type === 'post' || query.type === 'scrap';

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
        isSort={isPostSort}
        setIsSort={setIsPostSort}
        isScrapSort={isScrapSort}
        setIsScrapSort={setIsScrapSort}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        isRecruiting={isRecruiting}
        setIsRecruiting={setIsRecruiting}
      />
      <MyPostAndCommentList
        selectedTab={selectedTab}
        listData={listData}
        isLoading={isLoading || isFetching}
        isFetchingNextPage={isFetchingNextPage}
        postId={postId}
        setPostId={setPostId}
        showModal={showModal}
        setShowModal={setShowModal}
        mainMessage={mainMessage}
        setMainMessage={setMainMessage}
        subMessage={subMessage}
        setSubMessage={setSubMessage}
        modalType={modalType}
        setModalType={setModalType}
        onSuccess={handleEditSuccess}
      />
      {selectedTab === 'post' ||
        (selectedTab === 'scrap' && hasNextPage && (
          <div ref={observerRef} style={{ height: '1px' }} />
        ))}
      {selectedTab === 'comment' && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          {modalType === 'editUser'
            ? '회원 정보가 성공적으로 수정되었습니다 !'
            : modalType === 'editPassword'
            ? '비밀번호가 성공적으로 수정되었습니다 !'
            : modalType === 'deletePost'
            ? '게시글 삭제가 완료되었습니다 !'
            : modalType === 'cancelScrap'
            ? '스크랩 취소가 완료되었습니다 !'
            : ''}
        </Toast>
      )}
    </ResponsiveStyle>
  );
}
