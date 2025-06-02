import Image from 'next/image';
import { Description, PostWrapper, Title } from '../styles';
import { ListContainerProps } from '../types';
import { formattedDate } from '@/utils/formattedDate';
import { useState } from 'react';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';

export default function ContentsList({
  listData,
  isLoading,
  isFetchingNextPage,
}: ListContainerProps) {
  const [profileImg, setProfileImg] = useState<Record<string, string>>({});

  const defaultProfileImg = '/images/defaultProfile.svg';
  const handleProfileImgError = (src: string) => {
    setProfileImg((prev) => ({ ...prev, [src]: defaultProfileImg }));
  };
  return (
    <>
      {!isLoading && listData?.length === 0 ? (
        <Empty albatalk/>
      ) : (
        <div className='min-lg:min-h-[500px]'>
          <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-lg:gap-y-[16px]'>
            {(isLoading || isFetchingNextPage) && <Loader />}
            {listData.map((item) => {
              const { writer } = item;

              return (
                <PostWrapper key={item.id}>
                  <Title>{item.title}</Title>
                  <Description>{item.content}</Description>
                  <div className='flex items-center justify-between text-gray-500 pt-[80px] max-lg:pt-[24px] max-md:pt-[40px] font-light'>
                    <div className='flex items-center'>
                      <div className='flex items-center'>
                        <Image
                          src={
                            profileImg[String(writer?.imageUrl)] ||
                            writer?.imageUrl ||
                            defaultProfileImg
                          }
                          alt='기본프로필'
                          width={26}
                          height={26}
                          className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                          onError={() =>
                            handleProfileImgError(String(writer?.imageUrl))
                          }
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
                </PostWrapper>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
