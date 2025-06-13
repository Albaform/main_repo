'use client';
import styled, { css } from 'styled-components';
import { media } from '@/styles/media';

type SortResponsiveProps = {
  $type2?: boolean;
  $type3?: boolean;
  $list?: boolean;
};

export const FilterResponsive = styled.div`
  position: relative;
  padding: 112px 120px 24px;
  background: var(--white);

  @media ${media.desktop} {
    padding: 112px 0 24px;
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: 112px 24px 24px;
    margin: 0;
  }

  @media ${media.tablet} {
    padding: 78px 24px 16px;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 62px 24px 8px;
  }
`;

export const SortResponsive = styled.div<SortResponsiveProps>`
  position: relative;
  padding: 24px 120px;
  background: ${({ $type2, $type3, $list }) =>
    $type2 ? '' : $type3 || $list ? 'var(--background100)' : 'var(--white)'};

  ${({ $type3 }) =>
    $type3 &&
    css`
      border-bottom: 1px solid var(--line100);
    `}

  @media ${media.desktop} {
    padding: ${({ $type3, $list }) =>
      $type3
        ? '24px 0'
        : $list
        ? '24px 0 calc(env(safe-area-inset-bottom) + 62px) 0'
        : '24px 0'};
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: 24px;
    margin: 0;
  }

  @media ${media.tablet} {
    padding: 16px 24px;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 8px 24px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 32%;
  width: 32%;
  position: relative;
  cursor: pointer;

  @media (max-width: 1450px) {
    min-width: 49%;
    width: 49%;
  }

  @media ${media.tabletPC} {
    flex-direction: column;
    width: 100%;
    min-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 0 100px;
  }
`;

//최신순 dropdown
type DropdownProps = {
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

type DropdownButtonProps = {
  $active?: boolean;
};

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
