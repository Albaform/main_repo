'use client';

import { useGetPostsById } from '@/hooks/query/useGetPostsById';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import { useParams } from 'next/navigation';
import DetailContainer from './components/DetailContainer';
import CommentContainer from './components/CommentContainer';
import { useState } from 'react';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import { useModalController } from '@/hooks/common/useModalController';
import { useGetComments } from '@/hooks/query/useGetComments';
import Toast from '@/components/tooltip/Toast';

export default function DetailPage() {
  const [page, setPage] = useState(1);
  const [isShowComments, setIsShowComments] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const params = useParams();
  const paramsId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
  const postId = Number(paramsId);

  const { data: user } = useGetMyInfo();

  const { data: post, isLoading: getPostsLoading } = useGetPostsById(postId);
  const {
    data: comments,
    isLoading: getCommentsLoading,
    isFetching,
  } = useGetComments(page, postId);

  const { id: userId } = user ?? {};
  const {
    result: commentsList,
    totalPages,
    totalCommentCount,
  } = comments ?? {};

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

  const handleToggleComments = () => {
    setIsShowComments((prev) => !prev);
  };

  const handleEditSuccess = () => {
    setShowToast(true);
  };

  return (
    <ResponsiveStyle>
      <DetailContainer
        userId={userId}
        post={post}
        handleToggleComments={handleToggleComments}
        showModal={showModal}
        setShowModal={setShowModal}
        mainMessage={mainMessage}
        setMainMessage={setMainMessage}
        subMessage={subMessage}
        setSubMessage={setSubMessage}
        modalType={modalType}
        setModalType={setModalType}
        isLoading={getPostsLoading}
        isShowComments={isShowComments}
        totalCommentCount={totalCommentCount}
      />
      <div
        className={`transition-all duration-500 ${
          isShowComments
            ? 'opacity-100 translate-y-0 block'
            : 'opacity-0 -translate-y-y4 hidden'
        }`}
      >
        <CommentContainer
          userId={userId}
          postId={postId}
          comments={commentsList}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          setMainMessage={setMainMessage}
          subMessage={subMessage}
          setSubMessage={setSubMessage}
          modalType={modalType}
          setModalType={setModalType}
          isLoading={getCommentsLoading}
          isFetching={isFetching}
          onSuccess={handleEditSuccess}
        />
      </div>
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          {modalType === 'deleteComment' ? '삭제가 완료되었습니다 !' : ''}
        </Toast>
      )}
    </ResponsiveStyle>
  );
}
