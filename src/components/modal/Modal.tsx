import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ModalProps } from './Modal.types';
import Overlay from './Overlay';
import {
  ButtonType1,
  ButtonType2,
  CloseButton,
  Description,
  Title,
} from './Modal.styles';
import { useDeletePost } from '@/hooks/mutation/useDeletePosts';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComments } from '@/hooks/mutation/useDeleteComments';
import { useCancelScrapForms } from '@/hooks/mutation/useCancelScrapForms';
import { useDeleteForm } from '@/hooks/mutation/useDeleteForm';

function Modal({
  showModal,
  setShowModal,
  mainMessage,
  subMessage,
  $deletePost,
  $deleteForm,
  $deleteComment,
  $deadLine,
  $writeingForm,
  $deleteScrap,
  deletePostId,
  onSuccess,
}: ModalProps) {
  if (!showModal) return null;

  const router = useRouter();
  const pathname = usePathname();

  const isAlbatalkDetail = /^\/albatalk\/[^/]+$/.test(pathname);
  const isAlbaformDetail = /^\/albaform\/[^/]+$/.test(pathname);

  const { mutate: fetchDeletePost, isPending: postDeletePending } =
    useDeletePost();
  const { mutate: fetchDeleteComment, isPending: commentDeletePending } =
    useDeleteComments();
  const { mutate: fetchDeleteScrap, isPending: ScrapDeletePending } =
    useCancelScrapForms();
  const { mutate: fetchDeleteForm, isPending: FormDeletePending } =
    useDeleteForm();

  const isPending =
    postDeletePending ||
    commentDeletePending ||
    ScrapDeletePending ||
    FormDeletePending;

  const queryClient = useQueryClient();

  const handleAction = () => {
    if ($deletePost) {
      if (deletePostId)
        fetchDeletePost(deletePostId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) => {
                const key = query.queryKey?.[0];
                return key === 'myPosts' || key === 'posts';
              },
            });
            if (isAlbatalkDetail) {
              router.push('/albatalk');
            }
            onSuccess?.();
          },
          onSettled: () => {
            setShowModal(false);
          },
        });
    } else if ($deleteComment) {
      if (deletePostId) {
        fetchDeleteComment(deletePostId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'comments',
            });
            onSuccess?.();
          },
          onSettled: () => {
            setShowModal(false);
          },
        });
      }
    } else if ($deadLine) {
      router.push('/list');
    } else if ($deleteScrap) {
      if (deletePostId) {
        fetchDeleteScrap(deletePostId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'myScrap',
            });
            onSuccess?.();
          },
          onSettled: () => {
            setShowModal(false);
          },
        });
      }
    } else if ($deleteForm) {
      if (deletePostId) {
        fetchDeleteForm(deletePostId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) => {
                const key = query.queryKey?.[0];
                return key === 'albaforms' || key === 'forms';
              },
            });
            if (isAlbaformDetail) {
              router.push('/albaform');
            }
            onSuccess?.();
          },
          onSettled: () => {
            setShowModal(false);
          },
        });
      }
    }
  };

  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      {$deadLine ? (
        <Image
          src='/images/iconDeadLineModal.svg'
          alt='경고'
          width={80}
          height={80}
        />
      ) : $writeingForm ? (
        <Image
          src='/images/iconFormModal.svg'
          alt='경고'
          width={80}
          height={80}
        />
      ) : (
        <Image
          src='/images/iconDeleteModal.svg'
          alt='경고'
          width={80}
          height={80}
        />
      )}

      {$deadLine ||
        ($writeingForm && (
          <CloseButton>
            <Image
              src='images/iconCloseModal.svg'
              alt='X'
              width={24}
              height={24}
              onClick={() => setShowModal(false)}
            />
          </CloseButton>
        ))}
      <Title>{mainMessage}</Title>
      <Description>{subMessage}</Description>
      <ButtonType1 onClick={handleAction} disabled={isPending}>
        {$deadLine ? (
          '홈으로 가기'
        ) : $writeingForm ? (
          '이어쓰기'
        ) : isPending ? (
          <Image
            src='/images/buttonLoader.gif'
            alt='Loading'
            width={50}
            height={20}
          />
        ) : $deleteScrap ? (
          '취소하기'
        ) : (
          '삭제하기'
        )}
      </ButtonType1>
      {!$deadLine && !$writeingForm && (
        <ButtonType2 onClick={() => setShowModal(false)}>
          다음에 할게요
        </ButtonType2>
      )}
    </Overlay>
  );
}

export default Modal;
