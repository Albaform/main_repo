import Loader from '@/components/loader/Loader';
import { useImgError } from '@/hooks/common/useImgError';
import { Description, PostWrapper, Title } from '../../styles';
import Empty from '@/components/empty/Empty';
import Image from 'next/image';
import { formattedDate } from '@/utils/formattedDate';
import { ListContainerProps } from '../../types';
import { useRouter } from 'next/navigation';
import getRecruitStatus from '@/utils/getRecruitStatus';

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
        <Empty applications />
      ) : (
        <div className='min-lg:min-h-[500px]'>
          <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-lg:gap-y-[16px]'>
            {(isLoading || isFetchingNextPage) && <Loader />}
            {listData.map((item) => {
              const { form } = item;
              const { owner } = form;

              return (
                <PostWrapper key={item.id}>
                  <div className='flex items-center justify-between mb-6'>
                    <p className='text-gray400 font-light'>
                      {formattedDate(item.createdAt)}
                    </p>
                    <button
                      type='button'
                      className='underline text-black200 font-light'
                    >
                      지원내역 보기
                    </button>
                  </div>
                  <div className='flex items-center mb-4'>
                    <Image
                      src={
                        img[String(owner.imageUrl)] ||
                        owner.imageUrl ||
                        defaultImg
                      }
                      alt='기본프로필'
                      width={48}
                      height={48}
                      className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                      onError={() => handleImgError(String(owner.imageUrl))}
                    />
                    <p className='ml-[10px] text-black300'>{owner.storeName}</p>
                  </div>
                  <div className='mb-6'>
                    <Title>{form.title}</Title>
                    <Description>{form.description}</Description>
                  </div>
                  <div className='flex items-center'>
                    <div className='h-[38px] px-3 bg-orange-100 text-orange-400 border-orange100 border border-solid rounded leading-[38px] mr-[8px]'>
                      {item.status === 'REJECTED'
                        ? '거절'
                        : item.status === 'INTERVIEW_PENDING'
                        ? '면접 대기'
                        : item.status === 'INTERVIEW_COMPLETED'
                        ? '면접 완료'
                        : item.status === 'HIRED'
                        ? '채용 완료'
                        : ''}
                    </div>
                    <div className='h-[38px] px-3 bg-orange-100 text-orange-400 border border-solid border-orange100 rounded leading-[38px]'>
                      {getRecruitStatus(
                        form.recruitmentStartDate,
                        form.recruitmentEndDate,
                      )}
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
