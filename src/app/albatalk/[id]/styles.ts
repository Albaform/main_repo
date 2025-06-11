import { media } from '@/styles/media';
import styled from 'styled-components';

type EditContainerProps = {
  $active?: boolean;
};

type EditButtonProps = {
  $editInfo?: boolean;
};

type DropdownProps = {
  $active?: boolean;
};

type DropdownButtonProps = {
  $active?: boolean;
};

export const KebabButton = styled.div`
  min-width: 36px;
  margin-top: -3px;
  position: relative;
  cursor: pointer;

  .kebabImgWrapper {
    display: none;

    @media ${media.tabletPC} {
      display: block;
    }
  }
`;

export const EditButtonContainer = styled.div<EditContainerProps>`
  @media ${media.tabletPC} {
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    right: 0;
    padding: 5px;
    z-index: 100;
    border: 1px solid var(--line100);
    box-shadow: 4px 4px 4px rgba(228, 228, 228, 0.1);
    border-radius: 8px;
    background: var(--white);
  }
`;

export const EditButton = styled.button<EditButtonProps>`
  width: 180px;
  height: 58px;
  border-radius: 8px;
  margin-right: ${({ $editInfo }) => $editInfo && '16px'};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: ${({ $editInfo }) =>
    !$editInfo && '1px solid var(--primary-orange400)'};
  background: ${({ $editInfo }) =>
    $editInfo ? 'var(--primary-orange400)' : 'var(--white)'};
  color: ${({ $editInfo }) =>
    $editInfo ? 'var(--white)' : 'var(--primary-orange400)'};

  @media ${media.tabletPC} {
    width: 96px;
    height: 38px;
    margin-right: 0;
    border: 0;
    background: var(--white);
    color: var(--gray400);
    font-size: 14px;
    box-sizing: border-box;
    transition: 0.2s;

    &:hover {
      background: var(--primary-orange100);
      color: var(--black400);
    }
  }
`;

export const PostDropdownContainer = styled.div<DropdownProps>`
  display: ${({ $active }) => ($active ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  padding: 7px;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid var(--line100);
  box-shadow: 4px 4px 4px rgba(228, 228, 228, 0.1);
  z-index: 100;
  font-size: 16px;
`;

export const PostDropwonButton = styled.button<DropdownButtonProps>`
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
`;
