import Image from 'next/image';
import { CommentsProps } from '../types';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import DetailSkeleton from './DetailSkeleton';
import Empty from '@/components/empty/Empty';
import { useCreateCommentForm } from '../hooks/useCreateCommentForm';
import CommentsList from './CommentsList';

export default function CommentContainer({
  userId,
  postId,
  comments,
  page,
  setPage,
  totalPages,
  showModal,
  setShowModal,
  mainMessage,
  setMainMessage,
  subMessage,
  setSubMessage,
  modalType,
  setModalType,
  isLoading,
  isFetching,
  onSuccess,
}: CommentsProps) {
  const [commentId, setCommentId] = useState<number>();

  const { form, onSubmit, isPending } = useCreateCommentForm(postId);

  const { handleSubmit, register, watch } = form;

  const watched = watch();

  return (
    <>
      {showModal && modalType === 'deleteComment' && (
        <Modal
          $deleteComment
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          subMessage={subMessage}
          deletePostId={commentId}
          onSuccess={onSuccess}
        />
      )}
      <div
        className={`mt-[40px] text-right ${
          (!isLoading || !isFetching) && comments.length === 0
            ? 'mb-[-20px]'
            : 'mb-[80px]'
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            id='createComment'
            {...register('createComment')}
            placeholder='댓글을 입력해주세요'
            maxLength={500}
            className='w-full p-[14px] bg-background-200 rounded-[8px] font-light'
          />
          <button
            className='mt-[16px] bg-orange-400 rounded-[8px] h-[60px] text-white font-medium text-[18px] disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[160px] text-center justify-items-center'
            disabled={isPending || watched.createComment === ''}
          >
            {isPending ? (
              <Image
                src='/images/buttonLoader.gif'
                alt='Loading'
                width={50}
                height={20}
              />
            ) : (
              '등록하기'
            )}
          </button>
        </form>
      </div>
      {(!isLoading || !isFetching) && comments.length === 0 ? (
        <Empty comments />
      ) : (
        <>
          {isLoading ? (
            <DetailSkeleton $comment />
          ) : (
            <CommentsList
              userId={userId}
              setCommentId={setCommentId}
              comments={comments}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              setShowModal={setShowModal}
              setMainMessage={setMainMessage}
              setSubMessage={setSubMessage}
              setModalType={setModalType}
            />
          )}
        </>
      )}
    </>
  );
}
