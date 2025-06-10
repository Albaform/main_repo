import Image from 'next/image';
import { Description, PostWrapper, Title } from '../styles';
import { ListContainerProps } from '../types';
import { formattedDate } from '@/utils/formattedDate';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';
import { useRouter } from 'next/navigation';
import { useImgError } from '@/hooks/common/useImgError';

export default function ContentsList({
  listData,
  isLoading,
  isFetchingNextPage,
}: ListContainerProps) {
  const router = useRouter();

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultProfile.svg',
  );
  return (
    <>
      {!isLoading && listData?.length === 0 ? (
        <Empty albatalk />
      ) : (
        <div className='min-lg:min-h-[500px]'>
          <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-lg:gap-y-[16px]'>
            {(isLoading || isFetchingNextPage) && <Loader />}
            {listData.map((item) => {
              const { writer } = item;

              return (
                <PostWrapper
                  key={item.id}
                  onClick={() => router.push(`/albatalk/${item?.id}`)}
                >
                  <Title>{item.title}</Title>
                  <Description>{item.content}</Description>
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
                          onError={() =>
                            handleImgError(String(writer?.imageUrl))
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
                          src={'/images/iconUnLike.svg'}
                          alt='좋아요'
                          width={22}
                          height={22}
                          className='mr-[8px]'
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
