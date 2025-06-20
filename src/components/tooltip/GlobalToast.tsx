'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useToastStore } from '@/stores/useToastStore';

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

export default function GlobalToast() {
  const { message, show, hideToast } = useToastStore();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, hideToast]);

  if (!show || !message) return null;

  return (
    <Wrapper isVisible={show} role='alert'>
      <Content>
        <Icon src='/images/toast.svg' alt='toast' width={20} height={20} />
        <Text>{message}</Text>
      </Content>
    </Wrapper>
  );
}
