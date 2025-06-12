import Image from 'next/image';
import { formattedDate } from '@/utils/formattedDate';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';
import { useRouter } from 'next/navigation';
import { useImgError } from '@/hooks/common/useImgError';
import { OwnerListProps } from '../../types';
import { FormWrapper } from '../../styles';
import MenuDropdown from './scrapMenu/MenuDropdown';
import getDday from '@/utils/getDday';
import getRecruitStatus from '@/utils/getRecruitStatus';

export default function ContentsList({
  listData,
  isLoading,
  isFetchingNextPage,
  setPostId,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: OwnerListProps) {
  const router = useRouter();

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultImg.jpg',
  );

  return (
    <>
      {!isLoading && listData?.length === 0 ? (
        <Empty myAlbaform />
      ) : (
        <div className='min-lg:min-h-[500px]'>
          <div className='flex flex-wrap gap-x-[2%] gap-y-16 max-lg:gap-y-12 max-md:gap-y-8'>
            {(isLoading || isFetchingNextPage) && <Loader />}
            {listData.map((item) => {
              const recruitStatus = getRecruitStatus(
                String(item.recruitmentStartDate),
                String(item.recruitmentEndDate),
              );
              return (
                <FormWrapper key={item.id}>
                  <div
                    className='relative w-full h-[calc(100vw_*_(304/1920))] border border-solid border-gray-100 rounded-[16px] min-h-[304px] overflow-hidden'
                    style={{
                      boxShadow: '4px 4px 6px 0 rgba(212, 212, 212, 0.1)',
                    }}
                  >
                    <Image
                      src={
                        img[String(item.imageUrls?.[0])] ||
                        item.imageUrls?.[0] ||
                        defaultImg
                      }
                      alt='기본이미지'
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                      onError={() =>
                        handleImgError(String(item.imageUrls?.[0]))
                      }
                    />
                  </div>
                  <div className='flex items-center justify-between mt-6'>
                    <div className='flex items-center'>
                      <div
                        className={`h-[38px] px-3 mr-2 text-center border border-solid rounded leading-[38px] max-lg:text-[14px] max-xs:text-[12px] ${
                          item.isPublic
                            ? 'bg-orange-100 text-orange-400 border-orange-100'
                            : 'border-gray-200 text-black100'
                        }`}
                      >
                        {item.isPublic ? '공개' : '비공개'}
                      </div>
                      <div
                        className={`h-[38px] px-3 text-center border border-solid rounded leading-[38px] max-lg:text-[14px] max-xs:text-[12px] ${
                          recruitStatus === '모집 중'
                            ? 'bg-orange-100 text-orange-400 border-orange-100'
                            : 'border-gray-200 text-black100'
                        }`}
                      >
                        {recruitStatus}
                      </div>
                      <p className='ml-5 text-black200 font-light max-xs:text-[14px]'>
                        {formattedDate(String(item.recruitmentStartDate))} ~{' '}
                        {formattedDate(String(item.recruitmentEndDate))}
                      </p>
                    </div>
                    <MenuDropdown
                      postId={item.id}
                      setPostId={setPostId}
                      setShowModal={setShowModal}
                      setMainMessage={setMainMessage}
                      setSubMessage={setSubMessage}
                      setModalType={setModalType}
                    />
                  </div>
                  <p className='mt-6 mb-8 font-medium leading-7 line-clamp-2'>
                    {item.title}
                  </p>
                  <div className='flex items-center h-[50px] border border-solid border-line-100 rounded-[16px] text-center text-black200 font-light max-xs:text-[14px]'>
                    <div className='flex-[1]'>지원자 {item.applyCount}명</div>
                    <div className='flex-[1]'>스크랩 {item.scrapCount}명</div>
                    <div className='flex-[1]'>
                      {getDday(String(item.recruitmentEndDate))}
                    </div>
                  </div>
                </FormWrapper>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
