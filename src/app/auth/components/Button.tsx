// components/ui/Button.tsx
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface StyledProps {
  $isMobile: boolean;
}

const StyledButton = styled.button<StyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 640px;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 16px 0;
          font-size: 16px;
          line-height: 26px;
        `
      : css`
          padding: 20px 0;
          font-size: 20px;
          line-height: 32px;
        `}

  background-color: var(--primary-orange300);
  color: white;

  &:hover {
    background-color: var(--primary-orange400);
  }

  &:disabled {
    background-color: var(--gray100);
    pointer-events: none;
  }

  &:focus {
    outline: var(--primary-orange400);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <StyledButton
      $isMobile={isMobile}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '처리 중...' : children}
    </StyledButton>
  );
};

export default Button;
