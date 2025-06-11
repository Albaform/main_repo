import { ListContainerProps } from '../types';
import React from 'react';
import Loader from '@/components/loader/Loader';
import Empty from '@/components/empty/Empty';
import Modal from '@/components/modal/Modal';
import PostContainer from './PostContainer';
import ScrapContainer from './ScrapContainer';

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
              return (
                <React.Fragment key={item.id}>
                  {selectedTab === 'post' || selectedTab === 'comment' ? (
                    <PostContainer
                      selectedTab={selectedTab}
                      item={item}
                      setPostId={setPostId}
                      setShowModal={setShowModal}
                      setMainMessage={setMainMessage}
                      setSubMessage={setSubMessage}
                      setModalType={setModalType}
                    />
                  ) : (
                    <ScrapContainer
                      item={item}
                      setPostId={setPostId}
                      setShowModal={setShowModal}
                      setMainMessage={setMainMessage}
                      setSubMessage={setSubMessage}
                      setModalType={setModalType}
                    />
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
