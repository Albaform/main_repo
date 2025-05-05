// import { useState } from 'react';
// import Toast from '@/components/tooltip/Toast';

// export default function Example() {
//   const [show, setShow] = useState(true);

//   return (
//     <>
//       <button onClick={() => setShow(true)}>토스트 띄우기</button> (*Toast trigger 필요)
//       {show && <Toast onClose={() => setShow(false)}>저장되었습니다</Toast>}
//     </>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled(({ isVisible, ...rest }) => <div {...rest} />)<{
  isVisible: boolean;
}>`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ isVisible }) => (isVisible ? '0' : '-10px')});
  z-index: 9999;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;

  display: flex;
  align-items: center;
  padding: 12px 32px;
  background-color: var(--primary-blue300);
  border-radius: 8px;
  max-width: 640px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 327px;
    padding: 12px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.p`
  color: var(--white);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
`;

interface ToastProps {
  children: React.ReactNode;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  children,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // fade-in 시작
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // fade-out 시작
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300);

    // 완전 제거
    const removeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose, duration]);

  return (
    <Wrapper isVisible={isVisible} role='alert'>
      <Content>
        <Icon src='/images/toast.svg' alt='toast' width={20} height={20} />
        <Text>{children}</Text>
      </Content>
    </Wrapper>
  );
}
