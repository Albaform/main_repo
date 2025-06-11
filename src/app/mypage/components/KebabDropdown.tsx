import Image from 'next/image';
import {
  KebabButton,
  PostDropdownContainer,
  PostDropdownButton,
} from '../styles';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { KebabDropdownProps } from '../types';
import { useRouter } from 'next/navigation';

export default function KebabDropdown({
  postId,
  setPostId,
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: KebabDropdownProps) {
  const router = useRouter();
  const { outRef, dropdown, setDropdown } = useClickOutside();

  const handleDeleteOpenModal = () => {
    setPostId?.(postId);
    setShowModal(true);
    setModalType('deletePost');
    setMainMessage('선택하신 게시글을 삭제할까요?');
    setSubMessage('삭제 후 정보를 복구할 수 없어요.');
  };

  return (
    <KebabButton ref={outRef}>
      <Image
        src='/images/kebabButton.svg'
        alt='더보기'
        width={36}
        height={36}
        className='cursor-pointer'
        onClick={(e) => {
          e.stopPropagation();
          setDropdown((prev) => !prev);
        }}
      />
      <PostDropdownContainer $active={dropdown}>
        <PostDropdownButton
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/albatalk/${postId}/edit`);
          }}
        >
          수정하기
        </PostDropdownButton>
        <PostDropdownButton
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteOpenModal();
          }}
        >
          삭제하기
        </PostDropdownButton>
      </PostDropdownContainer>
    </KebabButton>
  );
}
