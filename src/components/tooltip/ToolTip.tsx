// export default function Example() {
//   const [show, setShow] = useState(true);

//   return (
//     <>
//       {show && <Tooltip onClose={() => setShow(false)}>ToolTip Modal</Tooltip>}
//     </>
//   );
// }

'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface TooltipProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  background-color: var(--primary-blue300);
  max-width: 476px;
  width: 100%;
  padding: 12px 24px 12px 15px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 16px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid var(--primary-blue300);
  }

  @media (max-width: 768px) {
    padding: 8px 18px 8px 12px;
    max-width: 300px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 32px;
  font-weight: 600;
  color: var(--white);

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
    color: var(--white);
  }
`;

const Icon = styled(Image)`
  width: 24px;
  height: 24px;

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export default function Tooltip({ children }: TooltipProps) {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Icon
            src='/images/tooltip.svg'
            alt='tooltip'
            width={24}
            height={24}
          />
          <Text>{children}</Text>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}
