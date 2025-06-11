import { useRouter } from 'next/navigation';
import { Comment, Description, PostWrapper, Title } from '../styles';
import Image from 'next/image';
import KebabDropdown from './KebabDropdown';
import { formattedDate } from '@/utils/formattedDate';
import { PostContainerProps } from '../types';
import { useImgError } from '@/hooks/common/useImgError';

export default function PostContainer({
  selectedTab,
  item,
  setPostId,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: PostContainerProps) {
  const router = useRouter();

  const { writer, post } = item;

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultProfile.svg',
  );
  return (
    <PostWrapper
      onClick={() =>
        router.push(
          `/albatalk/${selectedTab === 'post' ? `${item.id}` : `${post?.id}`}`,
        )
      }
    >
      <div>
        <div className='w-[100%] flex justify-between items-center'>
          <div className='flex items-center'>
            {selectedTab === 'comment' && (
              <Image
                src='/images/mypage/iconPost.svg'
                alt='Post'
                width={36}
                height={36}
              />
            )}
            <Title comment={selectedTab === 'comment'}>
              {selectedTab === 'post' ? item.title : post?.title}
            </Title>
          </div>
          {selectedTab === 'post' && (
            <KebabDropdown
              postId={item.id}
              setPostId={setPostId}
              setShowModal={setShowModal}
              setMainMessage={setMainMessage}
              setModalType={setModalType}
              setSubMessage={setSubMessage}
            />
          )}
        </div>
        <Description comment={selectedTab === 'comment'}>
          {selectedTab === 'post' ? item.content : post?.content}
        </Description>
      </div>
      {selectedTab === 'post' ? (
        <div className='flex items-center justify-between text-gray-500 pt-[80px] max-lg:pt-[24px] max-md:pt-[40px] font-light'>
          <div className='flex items-center'>
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
                className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                onError={() => handleImgError(String(writer?.imageUrl))}
              />
              <p className='max-xs:text-[14px]'>{writer?.nickname}</p>
            </div>
            <p className='pl-[16px] ml-[16px] border-l border-solid border-line-200 h-[18px] leading-[18px] max-xs:text-[14px] max-xs:pl-[12px] max-xs:ml-[12px]'>
              {formattedDate(item.createdAt)}
            </p>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center mr-[10px]'>
              <Image
                src='/images/iconComment.svg'
                alt='댓글'
                width={22}
                height={22}
                className='mt-[3px] mr-[8px]'
              />
              {item.commentCount}
            </div>
            <div className='flex items-center'>
              <Image
                src='/images/iconUnLike.svg'
                alt='좋아요'
                width={22}
                height={22}
                className='mr-[8px]'
              />
              {item.likeCount}
            </div>
          </div>
        </div>
      ) : selectedTab === 'comment' ? (
        <div className='border-t border-solid border-line-100 mt-[15px] pt-[25px]'>
          <Comment>{item.content}</Comment>
          <div className='text-[16px] mt-[16px] text-gray-500 font-light'>
            {formattedDate(item.createdAt)}
          </div>
        </div>
      ) : (
        ''
      )}
    </PostWrapper>
  );
}
