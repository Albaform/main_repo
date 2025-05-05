// export default function Example() {
//   const [show, setShow] = useState(true);

//   return (
//     <>
//       {show && <PopUp onClose={() => setShow(false)}>popup modal</PopUp>}
//     </>
//   );
// }

'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import CloseButton from '../closebutton/CloseButton';

interface PopUpProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-blue300);
  border-radius: 8px;
  padding: 12px 32px;
  max-width: 640px;
  width: 100%;

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

const Icon = styled(Image)`
  width: 22px;
  height: 22px;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

const Text = styled.p`
  color: var(--white);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

export default function PopUp({ children, onClose }: PopUpProps) {
  return (
    <Wrapper role='alert'>
      <Content>
        <Icon src='/images/popup.svg' alt='popup' width={22} height={22} />
        <Text>{children}</Text>
      </Content>
      <CloseButton onClose={onClose} />
    </Wrapper>
  );
}
