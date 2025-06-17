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
import { useNavLink } from '@/hooks/common/useNavLink';
import { useAtomValue } from 'jotai';
import { isNotFoundAtom } from '@/app/not-found';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isNotFound = useAtomValue(isNotFoundAtom);

  const { user: userData, hasHydrate } = useAuthStore();
  const { role } = userData ?? {};

  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage =
    pathname.includes('/signin') || pathname.includes('/signup');

  const { activeMenu, setActiveMenu, NavItems } = useNavLink(
    isLoginPage,
    pathname,
    role,
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          {!isNotFound && (
            <>
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
                      const url = (() => {
                        if (item.commonUrl) {
                          if (item.label === '알바 토크' && !role)
                            return '/signin/applicant';
                          return item.commonUrl;
                        }
                        if (!role) return '/signin/applicant';
                        return role === 'OWNER'
                          ? item.ownerUrl
                          : item.applicantUrl;
                      })();

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
                        router.push('/signin/applicant');
                        setActiveMenu('지원자 전용');
                      }}
                      style={{
                        fontSize: '16px',
                        background: 'var(--primary-blue300)',
                        border: '1px solid var(--primary-blue300)',
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
                <NavModal
                  onClose={handleCloseModal}
                  setShowToast={setShowToast}
                  role={role}
                />
              )}
            </>
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
