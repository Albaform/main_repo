import Image from 'next/image';
import {
  KebabButton,
  PostDropdownContainer,
  PostDropwonButton,
} from '../styles';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { KebabDropdownProps } from '../types';

export default function KebabDropdown({
  $deletePost,
  $deleteComment,
  postId,
  setPostId,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
  handleEdit,
}: KebabDropdownProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  const handleDeleteOpenModal = () => {
    setShowModal(true);

    setSubMessage('삭제 후 정보를 복구할 수 없어요.');
    if ($deletePost) {
      setModalType('deletePost');
      setMainMessage('선택하신 게시글을 삭제할까요?');
    } else if ($deleteComment) {
      setModalType('deleteComment');
      setMainMessage('선택하신 댓글을 삭제할까요?');
      setPostId?.(postId);
    }
  };

  return (
    <KebabButton ref={outRef}>
      <Image
        src='/images/kebabButton.svg'
        alt='더보기'
        width={36}
        height={36}
        className='cursor-pointer'
        onClick={() => setDropdown((prev) => !prev)}
      />
      <PostDropdownContainer $active={dropdown}>
        <PostDropwonButton
          type='button'
          onClick={() => {
            setDropdown(false);
            handleEdit?.();
          }}
        >
          수정하기
        </PostDropwonButton>
        <PostDropwonButton
          type='button'
          onClick={() => {
            setDropdown(false);
            handleDeleteOpenModal();
          }}
        >
          삭제하기
        </PostDropwonButton>
      </PostDropdownContainer>
    </KebabButton>
  );
}
