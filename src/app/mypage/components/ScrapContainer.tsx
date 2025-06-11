import { useRouter } from 'next/navigation';
import { ScrapWrapper } from '../styles';
import getRecruitStatus from '@/utils/getRecruitStatus';
import Image from 'next/image';
import { formattedDate } from '@/utils/formattedDate';
import MenuDropdown from './scrapMenu/MenuDropdown';
import getDday from '@/utils/getDday';
import { ScrapContainerProps } from '../types';
import { useImgError } from '@/hooks/common/useImgError';

export default function ScrapContainer({
  item,
  setPostId,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: ScrapContainerProps) {
  const router = useRouter();

  const { img, defaultImg, handleImgError } = useImgError(
    '/images/defaultImg.jpg',
  );

  const recruitStatus = getRecruitStatus(
    String(item.recruitmentStartDate),
    String(item.recruitmentEndDate),
  );
  return (
    <ScrapWrapper onClick={() => router.push(`/albaformList/${`${item.id}`}`)}>
      <div className='relative'>
        {!item.isPublic && (
          <>
            <div className='absolute inset-0 z-[5] rounded-[16px] backdrop-blur-sm bg-white/20' />
            <div className='absolute inset-0 z-[10] rounded-[16px] bg-black opacity-45' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] text-center justify-items-center'>
              <div className='relative w-[120px] h-[120px] max-md:w-[80px] max-md:h-[80px]'>
                <Image src='/images/mypage/private.svg' alt='비공개' fill />
              </div>
              <p className='text-white font-[18px] font-light max-md:font-[14px]'>
                비공개 처리된 알바폼이에요
              </p>
            </div>
          </>
        )}
        <div
          className='relative w-full h-[calc(100vw_*_(304/1920))] border border-solid border-gray-100 rounded-[16px] min-h-[304px] overflow-hidden'
          style={{
            boxShadow: '4px 4px 6px 0 rgba(212, 212, 212, 0.1)',
          }}
        >
          <Image
            src={img[String(item.imageUrl)] || item.imageUrl || defaultImg}
            alt='기본이미지'
            fill
            style={{
              objectFit: 'cover',
            }}
            onError={() => handleImgError(String(item.imageUrl))}
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
      </div>
    </ScrapWrapper>
  );
}
