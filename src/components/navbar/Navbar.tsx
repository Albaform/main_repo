'use client';

import { useEffect, useState } from 'react';
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
  const [activeMenu, setActiveMenu] = useState<string>('지원자 전용');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { user: userData, hasHydrate } = useAuthStore();
  const { role } = userData ?? {};

  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage =
    pathname.includes('/signin') || pathname.includes('/signup');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const NavItems = {
    default: [
      {
        label: '알바 목록',
        commonUrl: '/albaform',
      },
      {
        label: '알바 토크',
        commonUrl: '/albatalk',
      },
      {
        label: '내 알바폼',
        ownerUrl: '/myAlbaform/owner',
        applicantUrl: '/myAlbaform/applicant',
      },
    ],
    login: [
      {
        label: '사장님 전용',
        url: '/auth/signin/owner',
      },
      {
        label: '지원자 전용',
        url: '/auth/signin/applicant',
      },
    ],
  };

  useEffect(() => {
    if (isLoginPage) {
      const activeItem = NavItems.login.find((item) =>
        pathname.includes(item.url),
      );
      setActiveMenu(activeItem?.label ?? '');
    } else {
      const activeItem = NavItems.default.find((item) => {
        const url =
          item.commonUrl ??
          (role === 'OWNER' ? item.ownerUrl : item.applicantUrl);
        return url && pathname.includes(url);
      });
      setActiveMenu(activeItem?.label ?? '');
    }
  }, [pathname, role]);

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
              ? NavItems['login'].map((item, id) => (
                  <MenuItem
                    key={id}
                    $isActive={item.label === activeMenu}
                    onClick={() => {
                      router.push(item.url);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))
              : NavItems['default'].map((item, id) => {
                  const url =
                    item.commonUrl ??
                    (role === 'OWNER' ? item.ownerUrl : item.applicantUrl);

                  return (
                    <MenuItem
                      key={id}
                      $isActive={item.label === activeMenu}
                      onClick={() => {
                        if (url) {
                          router.push(url);
                        }
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
          </MenuList>
          {!userData
            ? hasHydrate &&
              !isLoginPage && (
                <button
                  onClick={() => {
                    router.push('/auth/signin/applicant');
                    setActiveMenu('지원자 전용');
                  }}
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
