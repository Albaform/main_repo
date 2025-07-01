'use client';

import React from 'react';
import styled, { css } from 'styled-components';

type ButtonSize = 'small' | 'large';
type ButtonVariant = 'primary' | 'large_primary' | 'secondary';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const size = {
  // 취소 버튼
  small: css`
    font-size: 20px;
    line-height: 32px;
    padding: 12px 24px;

    @media (max-width: 1024px) {
      font-size: 14px;
      line-height: 24px;
      padding: 8px 14px;
    }
  `,
  // 저장, 등록 버튼
  large: css`
    font-size: 20px;
    line-height: 32px;
    padding: 12px 24px;

    @media (max-width: 1024px) {
      padding: 16px;
      font-size: 16px;
      line-height: 26px;
    }
  `,
};

const variant = {
  // 취소 버튼
  primary: css`
    background-color: var(--gray100);
    color: var(--white);
    width: 120px;
    border: none;

    &:diabled {
      background-color: var(--gray100);
      color: var(--white);
      width: 120px;
      border: none;
    }

    &:hover {
      background-color: var(--primary-orange400);
    }

    @media (max-width: 1024px) {
      width: 52px;
    }
  `,
  // 등록 버튼
  large_primary: css`
    background-color: var(--gray100);
    color: var(--white);
    width: 100%;
    border: none;

    &:disabled {
      background-color: var(--gray100);
      color: var(--white);
      width: 100%;
      border: none;
    }

    &:hover {
      background-color: var(--primary-orange400);
    }
  `,
  // 저장 버튼
  secondary: css`
    background-color: var(--white);
    color: var(--gray400);
    width: 100%;
    border: 1px solid var(--gray100);

    &:disabled {
      background-color: var(--white);
      color: var(--gray400);
      width: 100%;
      border: 1px solid var(--gray100);
    }

    &:hover {
      color: var(--primary-orange400);
      border: 1px solid var(--primary-orange400);
    }
  `,
};

// 커스텀 버튼 컴포넌트
export default function CustomButton({
  children,
  size = 'small',
  variant = 'primary',
  ...rest
}: CustomButtonProps) {
  return (
    <StyledButton size={size} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}

// 스타일드 컴포넌트
const StyledButton = styled.button<CustomButtonProps>`
  box-sizing: border-box;
  text-align: center;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;

  ${(props) => size[props.size || 'small']}
  ${(props) => variant[props.variant || 'primary']}
`;
