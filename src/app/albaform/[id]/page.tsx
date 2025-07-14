'use client';

import BannerImagesCarousel from './components/BannerImagesCarousel';
import Section2 from './components/section2/Section2';
import Section1 from './components/section1/Section1';
import { CarouselReponsive, DetailResponsive } from './styles';
import { useState } from 'react';
import Toast from '@/components/tooltip/Toast';
import FloatingButton from '@/components/floatingbutton/FloatingButton';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import Section3 from './components/section3/Section3';
import { useParams, usePathname } from 'next/navigation';
import { useGetFormsById } from '@/hooks/query/useGetFormsById';
import { useModalController } from '@/hooks/common/useModalController';
import Modal from '@/components/modal/Modal';
import { useScrapForms } from '@/hooks/mutation/useScrapForms';
import useKakaoShare from '@/hooks/common/useKakaoShare';
import BannerSkeleton from './components/BannerSkeleton';
import ContentsSkeleton from './components/ContentsSkeleton';

export default function DetailPage() {
  const params = useParams();
  const path = usePathname();
  const paramsId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
  const formId = Number(paramsId);

  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { data: form, isLoading: getFormLoading } = useGetFormsById(formId);
  const { data: user, isLoading: getUserLoading } = useGetMyInfo();
  const { mutate: scrapMutate, isPending: postScrapPending } = useScrapForms();

  const { imageUrls, isScrapped } = form ?? {};
  const { role, id: userId } = user ?? {};

  const myPost = userId === form?.ownerId;

  const { handleShare } = useKakaoShare({
    url: path,
    title: form?.title,
    description: form?.description,
    imageUrl: form?.imageUrls[0],
  });

  const {
    showModal,
    setShowModal,
    mainMessage,
    setMainMessage,
    subMessage,
    setSubMessage,
    modalType,
    setModalType,
  } = useModalController();

  const handleToggleScrap = () => {
    scrapMutate(
      {
        formId,
        isScrapped,
      },
      {
        onSuccess: () => {
          setShowToast(true);
          if (isScrapped) {
            setToastMessage('스크랩이 취소되었습니다 !');
          } else {
            setToastMessage('스크랩이 완료되었습니다 !');
          }
        },
      },
    );
  };

  return (
    <>
      {showModal && modalType === 'deleteForms' && (
        <Modal
          $deleteForm
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          subMessage={subMessage}
          deletePostId={formId}
        />
      )}
      <CarouselReponsive>
        <div className='pt-[78px] max-lg:pt-[0]'>
          {getFormLoading ? (
            <BannerSkeleton />
          ) : (
            <BannerImagesCarousel imageUrls={imageUrls} />
          )}
        </div>
      </CarouselReponsive>
      <DetailResponsive $owner={role === 'OWNER'}>
        {getFormLoading ? (
          <ContentsSkeleton />
        ) : (
          <>
            <Section1 form={form} />
            <Section2
              form={form}
              formId={formId}
              setCopied={setCopied}
              role={role}
              isLoading={getUserLoading}
              myPost={myPost}
              setShowModal={setShowModal}
              setMainMessage={setMainMessage}
              setSubMessage={setSubMessage}
              setModalType={setModalType}
            />
          </>
        )}
      </DetailResponsive>
      {!getUserLoading && role === 'OWNER' && myPost && (
        <Section3 formId={formId} />
      )}
      {copied && (
        <Toast onClose={() => setCopied(false)}>
          {copied ? '복사가 완료되었습니다 !' : ''}
        </Toast>
      )}
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
      {!getFormLoading && (
        <FloatingButton
          $albaformDetail
          role={role}
          isScrapped={isScrapped}
          handleToggleScrap={handleToggleScrap}
          postScrapPending={postScrapPending}
          handleShare={handleShare}
        />
      )}
    </>
  );
}
