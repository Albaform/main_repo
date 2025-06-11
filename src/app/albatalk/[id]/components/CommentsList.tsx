import Image from 'next/image';
import KebabDropdown from './KebabDropdown';
import Pagination from '@/components/pagination/Pagination';
import { useState } from 'react';
import { CommentListProps } from '../types';
import { formattedDate } from '@/utils/formattedDate';
import EditComment from './EditComment';
import { useImgError } from '@/hooks/common/useImgError';

export default function CommentsList({
  userId,
  setCommentId,
  comments,
  page,
  setPage,
  totalPages,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultProfile.svg',
  );

  return (
    <div>
      {comments?.map((comment) => {
        const { writer } = comment;
        const isEditing = editingCommentId === comment.id;

        return (
          <div
            key={comment.id}
            className='pb-[24px] border-b border-solid border-line-200'
          >
            <div className='flex items-center justify-between text-gray-500 font-light text-[16px] mb-[37px] mt-[48px]'>
              <div className='flex items-center'>
                <Image
                  src={
                    img[String(writer?.imageUrl)] ||
                    writer?.imageUrl ||
                    defaultImg
                  }
                  alt='기본 프로필'
                  width={26}
                  height={26}
                  className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                  onError={() =>
                    handleImgError(String(writer?.imageUrl))
                  }
                />
                <p>{writer.nickname}</p>
                <div className='ml-[15px] mr-[15px] w-[1px] h-[20px] bg-line-200' />
                <p>{formattedDate(comment.createdAt)}</p>
              </div>
              {userId && writer.id && (
                <KebabDropdown
                  $deleteComment
                  postId={comment.id}
                  setPostId={setCommentId}
                  setShowModal={setShowModal}
                  setMainMessage={setMainMessage}
                  setModalType={setModalType}
                  setSubMessage={setSubMessage}
                  handleEdit={() => setEditingCommentId(comment.id)}
                />
              )}
            </div>
            <div className='whitespace-pre-wrap font-light'>
              {isEditing ? (
                <EditComment
                  content={comment.content}
                  editingCommentId={editingCommentId}
                  setEditingCommentId={setEditingCommentId}
                />
              ) : (
                comment.content
              )}
            </div>
          </div>
        );
      })}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
