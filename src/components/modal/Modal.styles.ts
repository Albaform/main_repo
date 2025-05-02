import { media } from '@/utils/responsive';
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: var(--white);
  width: 368px;
  min-height: 204px;
  padding: 24px 24px 10px 24px;
  border-radius: 24px;
  justify-items: center;
  text-align: center;

  @media (max-width: 400px) {
    width: 100%;
    min-width: auto;
    margin: 0 20px;
  }

  @media ${media.mobile} {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

export const Title = styled.p`
  margin: 24px 0 10px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0%;
`;

export const Description = styled.p`
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--gray400);
`;

export const ButtonType1 = styled.button`
  display: block;
  width: 100%;
  height: 58px;
  border-radius: 8px;
  background: var(--primary-orange300);
  color: var(--white);
`;

export const ButtonType2 = styled.button`
  display: block;
  width: 100%;
  height: 58px;
  color: var(--primary-orange300);
`;
