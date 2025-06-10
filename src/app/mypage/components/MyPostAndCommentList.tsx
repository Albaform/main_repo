import Image from 'next/image';
import {
  Title,
  PostWrapper,
  Description,
  Comment,
  ScrapWrapper,
} from '../styles';
import { ListContainerProps } from '../types';
import { formattedDate } from '@/utils/formattedDate';
import React, { useState } from 'react';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';
import KebabDropdown from './KebabDropdown';
import Modal from '@/components/modal/Modal';
import { useRouter } from 'next/navigation';
import MenuDropdown from './scrapMenu/MenuDropdown';
import getRecruitStatus from '@/utils/getRecruitStatus';
import getDday from '@/utils/getDday';

export default function ListContainer({
  selectedTab,
  listData,
  isLoading,
  isFetchingNextPage,
  postId,
  setPostId,
  showModal,
  setShowModal,
  mainMessage,
  setMainMessage,
  subMessage,
  setSubMessage,
  modalType,
  setModalType,
  onSuccess,
}: ListContainerProps) {
  const [profileImg, setProfileImg] = useState<Record<string, string>>({});

  const router = useRouter();

  const defaultProfileImg = '/images/defaultProfile.svg';
  const handleProfileImgError = (src: string) => {
    setProfileImg((prev) => ({ ...prev, [src]: defaultProfileImg }));
  };

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
          onSuccess={onSuccess}
        />
      ) : showModal && modalType === 'cancelScrap' ? (
        <Modal
          $deleteScrap
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          subMessage={subMessage}
          deletePostId={postId}
          onSuccess={onSuccess}
        />
      ) : (
        ''
      )}
      {!isLoading && listData?.length === 0 ? (
        <Empty selectedTab={selectedTab} />
      ) : (
        <div className='min-lg:min-h-[500px]'>
          <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-lg:gap-y-[16px]'>
            {(isLoading || isFetchingNextPage) && <Loader />}
            {listData?.map((item) => {
              const { writer, post } = item;

              const recruitStatus = getRecruitStatus(
                String(item.recruitmentStartDate),
                String(item.recruitmentEndDate),
              );

              return (
                <React.Fragment key={item.id}>
                  {selectedTab === 'post' || selectedTab === 'comment' ? (
                    <PostWrapper
                      onClick={() =>
                        router.push(
                          `/albatalk/${
                            selectedTab === 'post'
                              ? `${item.id}`
                              : `${post?.id}`
                          }`,
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
                              {selectedTab === 'post'
                                ? item.title
                                : post?.title}
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
                          {selectedTab === 'post'
                            ? item.content
                            : post?.content}
                        </Description>
                      </div>
                      {selectedTab === 'post' ? (
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
                                  handleProfileImgError(
                                    String(writer?.imageUrl),
                                  )
                                }
                              />
                              <p className='max-xs:text-[14px]'>
                                {writer?.nickname}
                              </p>
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
                  ) : (
                    <ScrapWrapper
                      onClick={() =>
                        router.push(`/albaformList/${`${item.id}`}`)
                      }
                    >
                      <div className='relative'>
                        {!item.isPublic && (
                          <>
                            <div className='absolute inset-0 z-[5] rounded-[16px] backdrop-blur-sm bg-white/20' />
                            <div className='absolute inset-0 z-[10] rounded-[16px] bg-black opacity-45' />
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] text-center justify-items-center'>
                              <div className='relative w-[120px] h-[120px] max-md:w-[80px] max-md:h-[80px]'>
                                <Image
                                  src='/images/mypage/private.svg'
                                  alt='비공개'
                                  fill
                                />
                              </div>
                              <p className='text-white font-[18px] font-light max-md:font-[14px]'>
                                비공개 처리된 알바폼이에요
                              </p>
                            </div>
                          </>
                        )}
                        <div
                          className='relative w-full h-[calc(100vw_*_(304/1920))] border border-solid border-gray-100 rounded-[16px] min-h-[304px]'
                          style={{
                            boxShadow: '4px 4px 6px 0 rgba(212, 212, 212, 0.1)',
                          }}
                        >
                          <Image
                            src={
                              profileImg[String(item?.imageUrl)] ||
                              item?.imageUrl ||
                              defaultProfileImg
                            }
                            alt='기본이미지'
                            fill
                            style={{
                              objectFit: 'cover',
                            }}
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
                              {formattedDate(String(item.recruitmentStartDate))}{' '}
                              ~ {formattedDate(String(item.recruitmentEndDate))}
                            </p>
                          </div>
                          <MenuDropdown
                            postId={item.id}
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
                          <div className='flex-[1]'>
                            지원자 {item.applyCount}명
                          </div>
                          <div className='flex-[1]'>
                            스크랩 {item.scrapCount}명
                          </div>
                          <div className='flex-[1]'>
                            {getDday(String(item.recruitmentEndDate))}
                          </div>
                        </div>
                      </div>
                    </ScrapWrapper>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
