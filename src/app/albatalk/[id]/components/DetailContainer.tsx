import Image from 'next/image';
import DynamicImage from './DynamicImage';
import { PostDetailProps } from '../types';
import { formattedDate } from '@/utils/formattedDate';
import KebabDropdown from './KebabDropdown';
import Modal from '@/components/modal/Modal';
import DetailSkeleton from './DetailSkeleton';
import { useLikePosts } from '@/hooks/mutation/useLikePosts';
import LikeButton from './LikeButton';
import { useImgError } from '@/hooks/common/useImgError';

export default function DetailContainer({
  userId,
  post,
  handleToggleComments,
  showModal,
  setShowModal,
  mainMessage,
  setMainMessage,
  subMessage,
  setSubMessage,
  modalType,
  setModalType,
  isLoading,
  isShowComments,
  totalCommentCount,
}: PostDetailProps) {
  const { id: postId, writer } = post ?? {};

  const { mutate: toggleLikePost, isPending } = useLikePosts();

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultProfile.svg',
  );
  return (
    <>
      {showModal && modalType === 'deletePost' ? (
        <Modal
          $deletePost
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          subMessage={subMessage}
          deletePostId={postId}
        />
      ) : (
        ''
      )}
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <>
          <div className='flex justify-between items-start mt-[48px] pb-[20px] border-b border-solid border-line-200'>
            <p className='text-[24px] font-medium mt-[-2px] leading-[1.4]'>
              {post?.title}
            </p>
            {userId === writer?.id && (
              <KebabDropdown
                $deletePost
                postId={postId}
                setShowModal={setShowModal}
                setMainMessage={setMainMessage}
                setModalType={setModalType}
                setSubMessage={setSubMessage}
              />
            )}
          </div>
          <div className='flex items-center mt-[20px] text-gray-400'>
            <div className='flex items-center'>
              <Image
                src={
                  img[String(writer?.imageUrl)] ||
                  writer?.imageUrl ||
                  defaultImg
                }
                alt='기본프로필'
                width={26}
                height={26}
                className='rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                onError={() => handleImgError(String(writer?.imageUrl))}
              />
              <p className='ml-[10px]'>{writer?.nickname}</p>
            </div>
            <div className='pl-[15px] ml-[15px] border-l border-solid border-line-200'>
              {formattedDate(post?.createdAt)}
            </div>
          </div>
          <div className='max-w-[400px] mt-[88px] max-xs:max-w-[100%] '>
            <DynamicImage src={post?.imageUrl} />
          </div>
          <p className='mt-[30px] mb-[100px] whitespace-pre-wrap text-gray-400 font-light'>
            {post?.content}
          </p>
          <div className='flex items-center text-gray-400 pb-[16px] border-b border-solid border-line-200'>
            <button
              onClick={handleToggleComments}
              className={`flex items-center mr-[10px] px-4 py-1.5 rounded-full border-solid active:scale-95 duration-[.1s] ${
                isShowComments
                  ? 'border-black300 bg-black300'
                  : 'border-gray-100 bg-white'
              }`}
            >
              <Image
                src={
                  isShowComments
                    ? '/images/iconActiveComment.svg'
                    : '/images/iconComment.svg'
                }
                alt='댓글'
                width={23}
                height={16}
                className='mr-[10px] mt-[3px]'
              />
              {totalCommentCount !== undefined ? (
                totalCommentCount
              ) : (
                <div className='inline-flex items-center justify-center w-4 aspect-square rounded-full bg-gray-300/60 animate-pulse' />
              )}
            </button>
            <div className='relative inline-block'>
              <LikeButton
                post={post}
                postId={postId}
                toggleLikePost={toggleLikePost}
                isPending={isPending}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
