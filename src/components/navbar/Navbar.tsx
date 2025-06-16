'use client';

import { useState } from 'react';
import NavModal from './NavModal';
import { usePathname, useRouter } from 'next/navigation';

import {
  ContentsWrapper,
  Hamburger,
  Logo,
  MenuItem,
  MenuList,
  NavbarWrapper,
} from './Navbar.styles';
import { useAuthStore } from '@/stores/useAuthStore';
import Toast from '../tooltip/Toast';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { user: userData, hasHydrate } = useAuthStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const pathname = usePathname();
  const isLoginPage =
    pathname.includes('/signin') || pathname.includes('/signup');

  const router = useRouter();

  const menuItems = {
    default: ['알바 목록', '알바 토크', '내 알바폼'],
    login: ['사장님 전용', '지원자 전용'],
  };

  return (
    <div>
      <NavbarWrapper>
        <ContentsWrapper>
          <Logo
            src='/images/navigation/logoPC.svg'
            alt='Albaform'
            className='hidden md:block'
            onClick={() => router.push('/')}
          />
          <Logo
            src='/images/navigation/logoMobile.svg'
            alt='Albaform'
            className='block md:hidden'
            onClick={() => router.push('/')}
          />
          <MenuList $alignRight={isLoginPage}>
            {isLoginPage
              ? menuItems['login'].map((item) => (
                  <MenuItem
                    key={item}
                    $isActive={item === activeMenu}
                    onClick={() => setActiveMenu(item)}
                  >
                    {item}
                  </MenuItem>
                ))
              : menuItems['default'].map((item) => (
                  <MenuItem
                    key={item}
                    $isActive={item === activeMenu}
                    onClick={() => setActiveMenu(item)}
                  >
                    {item}
                  </MenuItem>
                ))}
          </MenuList>
          {!userData && hasHydrate
            ? !isLoginPage && (
                <button
                  onClick={() => router.push('/auth/signin/owner')}
                  style={{
                    fontSize: '16px',
                    background: 'var(--primary-orange300)',
                    border: '1px solid var(--primary-orange300)',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                >
                  로그인
                </button>
              )
            : !isLoginPage && (
                <Hamburger
                  src='/images/menu.png'
                  alt='Menu'
                  onClick={handleOpenModal}
                />
              )}
          {isModalOpen && (
            <NavModal onClose={handleCloseModal} setShowToast={setShowToast} />
          )}
        </ContentsWrapper>
      </NavbarWrapper>
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          로그아웃이 완료 되었습니다 !
        </Toast>
      )}
    </div>
  );
}
