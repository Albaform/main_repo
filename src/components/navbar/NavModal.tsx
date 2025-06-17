'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';
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
import { AnimatePresence } from 'framer-motion';

const myPageIcon = '/images/mypage.png';
const logoutIcon = '/images/logout.png';
const closeButtonImg = '/images/X.png';
const slideVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

export default function NavModal({
  onClose,
  setShowToast,
  role,
}: {
  onClose: () => void;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  role: string | undefined;
}) {
  const router = useRouter();
  const { clearUser: logout } = useAuthStore();

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    onClose();
    setShowToast(true);
  };

  const mypageUrl = () => {
    onClose();
    if (role)
      if (role === 'OWNER') {
        router.push('/mypage/owner');
      } else {
        router.push('/mypage/applicant');
      }
  };

  return (
    <div>
      <Overlay onClick={handleBackgroundClick}>
        <AnimatePresence>
          <ModalContainer
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={slideVariants}
            transition={{ duration: 0.3 }}
          >
            <CloseButtonWrapper>
              <CloseButton src={closeButtonImg} onClick={onClose} />
            </CloseButtonWrapper>
            <ModalContent onClick={mypageUrl}>
              <Image src={myPageIcon} alt='mypage' width={36} height={36} />
              <p className='mt-[2px]'>마이 페이지</p>
            </ModalContent>
            <ModalContent onClick={handleLogout}>
              <Image src={logoutIcon} alt='logout' width={36} height={36} />
              <p className='mt-[1px]'>로그아웃</p>
            </ModalContent>
          </ModalContainer>
        </AnimatePresence>
      </Overlay>
    </div>
  );
}
