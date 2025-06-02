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

function Modal({
  showModal,
  setShowModal,
  mainMessage,
  subMessage,
  $deletePost,
  $deleteAlbaform,
  $deadLine,
  $writeingForm,
  deletePostId,
  onSuccess,
}: ModalProps) {
  if (!showModal) return null;

  const router = useRouter();
  const pathname = usePathname();

  const isAlbatalkDetail = /^\/albatalk\/[^/]+$/.test(pathname);

  const { mutate: fetchDeletePost } = useDeletePost();

  const queryClient = useQueryClient();

  const handleAction = () => {
    if ($deletePost) {
      if (deletePostId)
        fetchDeletePost(deletePostId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'myPosts',
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
    } else if ($deadLine) {
      router.push('/list');
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
      <ButtonType1 onClick={handleAction}>
        {$deadLine ? '홈으로 가기' : $writeingForm ? '이어쓰기' : '삭제하기'}
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
