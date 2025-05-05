'use client';

import Image from 'next/image';
import { EditButton, EditButtonContainer, KebabButton } from '../../styles';
import { useClickOutside } from '@/utils/useClickOutside';

export default function HeadContainer() {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <>
      <div className='flex justify-between items-center py-6 px-0'>
        <p className='text-[32px] font-medium max-[768px]:text-[20px]'>
          마이페이지
        </p>
        <KebabButton ref={outRef}>
          <div className='kebabImgWrapper'>
            <Image
              src='/images/kebabButton.svg'
              alt='더보기'
              width={24}
              height={24}
              onClick={() => setDropdown((prev) => !prev)}
            />
          </div>
          <EditButtonContainer $active={dropdown}>
            <EditButton type='button' $editInfo>
              내 정보 수정
            </EditButton>
            <EditButton type='button'>비밀번호 변경</EditButton>
          </EditButtonContainer>
        </KebabButton>
      </div>
    </>
  );
}
