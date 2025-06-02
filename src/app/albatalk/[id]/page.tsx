'use client';

import { useGetPostsById } from '@/hooks/query/useGetPostsById';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import { useParams } from 'next/navigation';
import DetailContainer from './components/DetailContainer';
import CommentContainer from './components/CommentContainer';
import { useState } from 'react';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import { useModalController } from '@/hooks/common/useModalController';

export default function DetailPage() {
  const [isShowComments, setIsShowComments] = useState(false);

  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

  const { data: user } = useGetMyInfo();
  const { data: post, isLoading } = useGetPostsById(postId);

  const { id: userId } = user ?? {};

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
        isLoading={isLoading}
      />
      <div
        className={`transition-all duration-500 ${
          isShowComments
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-y4'
        }`}
      >
        <CommentContainer />
      </div>
    </ResponsiveStyle>
  );
}
