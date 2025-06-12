import Image from 'next/image';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { useRouter } from 'next/navigation';
import {
  KebabButton,
  PostDropdownButton,
  PostDropdownContainer,
} from '@/app/myAlbaform/styles';
import { KebabDropdownProps } from '@/app/myAlbaform/types';

export default function MenuDropdown({
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
    setModalType('deleteForms');
    setMainMessage('선택하신 알바폼을 삭제할까요?');
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
            // 구현된 페이지가 없어 보류
            // router.push(`/editAlbaform/owner/${postId}`);
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
