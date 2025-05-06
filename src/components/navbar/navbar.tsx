'use client';

import styled from 'styled-components';
import { useState } from 'react';
import NavModal from './NavModal';
import { usePathname, useRouter } from 'next/navigation';
import { media } from '@/styles/media';

type NavVariant = 'default' | 'login';

interface Props {
  variant?: NavVariant;
}

export default function Navbar({ variant = 'default' }: Props) {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const pathname = usePathname();
  const router = useRouter();
  const isLandingPage = pathname === '/';

  const bgColor = {
    default: 'var(--white)',
    login: 'var(--white)',
  };

  const menuItems = {
    default: ['알바 목록', '알바 토크', '내 알바폼'],
    login: ['사장님 전용', '지원자 전용'],
  };

  const hamburgerMenu = {
    default: '/images/menu.png',
    login: 'none',
  };

  const Logo = styled.img`
    height: 40px;
    cursor: pointer;
    margin-right: 48px;
  `;

  const NavbarWrapper = styled.nav<{ $bg: string }>`
    position: fixed;
    width: 1920px;
    height: 88px;
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 24px 220px;
    background-color: ${(props) => props.$bg};
    border-bottom: 1px solid var(--gray100);
    padding: 0 120px;

    /* Desktop: 중앙 정렬 + max-width 제한 */
  @media ${media.tablet} {
    padding: 0;
    max-width: 1480px;
    margin: 0 auto;
    height: 60px;
  }

  /* Tablet 이하: 패딩 24px, 좌우 꽉 채움 */
  @media ${media.mobile} {
    padding: 0 24px;
    margin: 0;
    height: 54px;
  }


  `;
  const MenuList = styled.ul<{ $alignRight?: boolean }>`
    display: flex;
    gap: 24px;
    flex: 1;
    justify-content: ${(props) =>
      props.$alignRight ? 'flex-end' : 'flex-start'};
  `;

  const MenuItem = styled.li<{ $isActive?: boolean }>`
    font-size: 20px;
    color: ${(props) =>
      props.$isActive ? 'var( --primary-orange300)' : 'var( --gray300)'};
    cursor: pointer;
    &:hover {
      color: var(--primary-orange300);
    }
  `;

  const Hamburger = styled.img`
    width: 36px;
    height: 36px;
    cursor: pointer;
  `;

  return (
    <div>
      <NavbarWrapper $bg={bgColor[variant]}>
        <Logo src='/logo/logo.png' alt='logo' />
        <MenuList $alignRight={variant === 'login'}>
          {menuItems[variant].map((item) => (
            <MenuItem
              key={item}
              $isActive={item === activeMenu}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
        {isLandingPage ? (
  <button
    onClick={() => router.push('/signin')}
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
) : (
  hamburgerMenu[variant] !== 'none' && (
    <Hamburger
      src={hamburgerMenu[variant]}
      alt='menu icon'
      onClick={handleOpenModal}
    />
  )
)}
        {isModalOpen && <NavModal onClose={handleCloseModal} />}
      </NavbarWrapper>
    </div>
  );
}
