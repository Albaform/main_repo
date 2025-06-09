import { media } from '@/styles/media';
import styled, { css } from 'styled-components';

type DropdownProps = {
  $active?: boolean;
};

type DropdownButtonProps = {
  $active?: boolean;
};

export const DropdownContainer = styled.div<DropdownProps>`
  position: absolute;
  top: 150%;
  right: 0;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    `}
`;

export const DropdownBox = styled.div`
  padding: 7px;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid var(--line100);
  box-shadow: 4px 4px 4px rgba(228, 228, 228, 0.1);
  z-index: 100;
  font-size: 16px;

  @media ${media.tablet} {
    font-size: 14px;
  }
`;

export const DropdownButton = styled.button<DropdownButtonProps>`
  width: 118px;
  height: 38px;
  margin-bottom: 7px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 400;
  color: var(--gray400);

  &:hover {
    background: var(--primary-orange100);
    color: var(--black400);
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $active }) =>
    $active &&
    css`
      background: var(--primary-orange100);
      color: var(--black400);
    `}
`;
