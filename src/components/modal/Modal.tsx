import { useRouter } from 'next/navigation';
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

function Modal({
  showModal,
  setShowModal,
  mainMessage,
  subMessage,
  deadLine,
  writeForm,
}: ModalProps) {
  if (!showModal) return null;

  const router = useRouter();

  const handleAction = () => {
    if (deadLine) router.push('/list');
  };

  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      {deadLine ? (
        <Image
          src='/images/iconDeadLineModal.svg'
          alt='경고'
          width={80}
          height={80}
        />
      ) : writeForm ? (
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

      {deadLine ||
        (writeForm && (
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
        {deadLine ? '홈으로 가기' : writeForm ? '이어쓰기' : '삭제하기'}
      </ButtonType1>
      {!deadLine && !writeForm && (
        <ButtonType2 onClick={() => setShowModal(false)}>
          다음에 할게요
        </ButtonType2>
      )}
    </Overlay>
  );
}

export default Modal;
