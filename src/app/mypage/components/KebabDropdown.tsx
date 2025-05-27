import Image from 'next/image';
import {
  KebabButton,
  PostDropdownContainer,
  PostDropwonButton,
} from '../styles';
import { useClickOutside } from '@/hooks/common/useClickOutside';

export default function KebabDropdown() {
  const { outRef, dropdown, setDropdown } = useClickOutside();

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
        <PostDropwonButton type='button'>수정하기</PostDropwonButton>
        <PostDropwonButton type='button'>삭제하기</PostDropwonButton>
      </PostDropdownContainer>
    </KebabButton>
  );
}
