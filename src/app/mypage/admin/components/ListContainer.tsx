import Image from 'next/image';
import {
  Title,
  PostWrapper,
  Description,
  KebabButton,
  PostDropdownContainer,
  PostDropwonButton,
  Comment,
} from '../../styles';
import { useClickOutside } from '@/utils/useClickOutside';
import { ListContainerProps } from '../../types';
import { formattedDate } from '@/utils/formattedDate';
import { useState } from 'react';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';

export default function ListContainer({
  selectedTab,
  listData,
  isLoading,
  isFetchingNextPage,
}: ListContainerProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  const [profileImg, setProfileImg] = useState<Record<string, string>>({});

  const defaultProfileImg = '/images/defaultProfile.svg';
  const handleProfileImgError = (src: string) => {
    setProfileImg((prev) => ({ ...prev, [src]: defaultProfileImg }));
  };

  return (
    <>
      {!isLoading && listData?.length === 0 ? (
        <Empty selectedTab={selectedTab} />
      ) : (
        <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-[1199px]:gap-y-[16px]'>
          {(isLoading || isFetchingNextPage) && <Loader />}
          {listData?.map((item) => {
            const { writer } = item;
            const { post } = item;

            return (
              <PostWrapper key={item.id}>
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
                      <KebabButton ref={outRef}>
                        <Image
                          src='/images/kebabButton.svg'
                          alt='더보기'
                          width={36}
                          height={36}
                          className='cursor-pointer'
                          onClick={() => setDropdown((prev) => !prev)}
                        />
                        <PostDropdownContainer $active={dropdown}>
                          <PostDropwonButton type='button'>
                            수정하기
                          </PostDropwonButton>
                          <PostDropwonButton type='button'>
                            삭제하기
                          </PostDropwonButton>
                        </PostDropdownContainer>
                      </KebabButton>
                    )}
                  </div>
                  <Description comment={selectedTab === 'comment'}>
                    {selectedTab === 'post' ? item.content : post?.content}
                  </Description>
                </div>
                {selectedTab === 'post' ? (
                  <div className='flex items-center justify-between text-gray-500 pt-[80px] max-[1199px]:pt-[24px] max-[768px]:pt-[40px] font-light'>
                    <div className='flex items-center'>
                      <div className='flex items-center'>
                        <Image
                          src={
                            profileImg[String(writer?.imageUrl)] ||
                            writer?.imageUrl ||
                            defaultProfileImg
                          }
                          alt='기본프로필'
                          width={!writer?.imageUrl ? 36 : 26}
                          height={!writer?.imageUrl ? 36 : 26}
                          className='mr-[5px] rounded-[50%] object-cover border border-gray500'
                          onError={() =>
                            handleProfileImgError(String(writer?.imageUrl))
                          }
                        />
                        {writer?.nickname}
                      </div>
                      <p className='pl-[16px] ml-[16px] border-l border-solid border-line-200 h-[18px] leading-[18px]'>
                        {formattedDate(item.createdAt)}
                      </p>
                    </div>
                    <div className='flex items-center'>
                      <div className='flex items-center mr-[10px]'>
                        <Image
                          src='/images/mypage/comment.svg'
                          alt='댓글'
                          width={36}
                          height={36}
                        />
                        {item.commentCount}
                      </div>
                      <div className='flex items-center'>
                        <Image
                          src='/images/mypage/like.svg'
                          alt='좋아요'
                          width={36}
                          height={36}
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
          })}
        </div>
      )}
    </>
  );
}
