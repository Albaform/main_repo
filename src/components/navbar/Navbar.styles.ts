import { media } from '@/styles/media';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Logo = styled.img`
  height: 40px;
  cursor: pointer;
  margin-right: 48px;

  @media ${media.tablet} {
    margin-right: 16px;
  }
`;

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: var(--white);
  border-bottom: 1px solid var(--gray100);
`;

export const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 120px;
  height: 88px;

  /* Desktop: 중앙 정렬 + max-width 제한 */

  @media ${media.desktop} {
    padding: 0;
    max-width: 1480px;
    margin: 0 auto;
  }

  /* Tablet 이하: 패딩 24px, 좌우 꽉 채움 */
  @media ${media.tabletPC} {
    padding: 0 24px;
    margin: 0;
  }

  @media ${media.tablet} {
    height: 60px;
  }

  @media ${media.mobile} {
    height: 54px;
  }
`;

export const MenuList = styled.ul<{ $alignRight?: boolean }>`
  display: flex;
  gap: 24px;
  flex: 1;
  justify-content: ${(props) =>
    props.$alignRight ? 'flex-end' : 'flex-start'};
`;

export const MenuItem = styled.li<{ $isActive?: boolean }>`
  font-size: 20px;
  color: ${(props) =>
    props.$isActive ? 'var( --primary-orange300)' : 'var( --gray300)'};
  cursor: pointer;
  &:hover {
    color: var(--primary-orange300);
  }

  @media ${media.tablet} {
    font-size: 16px;
  }

  @media ${media.mobile} {
    font-size: 14px;
  }
`;

export const Hamburger = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  background: white;
  width: calc(100vw * (560 / 1920));
  min-width: 300px;
  height: 100vh;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

export const CloseButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 88px;
  border-bottom: 1px solid var(--gray100);

  @media ${media.tablet} {
    height: 60px;
  }

  @media ${media.mobile} {
    height: 55px;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  font-size: 20px;
  width: 100%;
  height: 100px;
  padding: 32px 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;
