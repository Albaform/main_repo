import Image from 'next/image';
import {
  KebabButton,
  PostDropdownContainer,
  PostDropdownButton,
} from '../../styles';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { KebabDropdownProps } from '../../types';
import { useRouter } from 'next/navigation';

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
    setModalType('cancelScrap');
    setMainMessage('선택하신 알바폼의 스크랩을 취소할까요?');
    setSubMessage('취소 후 정보를 복구할 수 없어요.');
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
            router.push(`/createAlbaform/applicant?formId=${postId}`);
          }}
        >
          지원하기
        </PostDropdownButton>
        <PostDropdownButton
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteOpenModal();
          }}
        >
          스크랩 취소
        </PostDropdownButton>
      </PostDropdownContainer>
    </KebabButton>
  );
}
