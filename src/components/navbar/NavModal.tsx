'use client';

import { MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CloseButton,
  CloseButtonWrapper,
  ModalContainer,
  ModalContent,
  Overlay,
} from './Navbar.styles';
import { useAuthStore } from '@/stores/useAuthStore';

const myPageIcon = '/images/mypage.png';
const logoutIcon = '/images/logout.png';
const closeButtonImg = '/images/X.png';

export default function NavModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { clearUser: logout } = useAuthStore();

  return (
    <div>
      <Overlay onClick={handleBackgroundClick}>
        <ModalContainer>
          <CloseButtonWrapper>
            <CloseButton src={closeButtonImg} onClick={onClose} />
          </CloseButtonWrapper>
          <ModalContent>
            <Image
              src={myPageIcon}
              alt='mypage'
              width={36}
              height={36}
              onClick={() => router.push('/mypage')}
            />
            <p onClick={() => router.push('/mypage')}>마이 페이지</p>
          </ModalContent>
          <ModalContent
            onClick={() => {
              logout();
              router.push('/');
              onClose();
            }}
          >
            <Image src={logoutIcon} alt='logout' width={36} height={36} />
            <p>로그아웃</p>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </div>
  );
}
