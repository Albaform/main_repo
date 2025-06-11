import styled from 'styled-components';

export const LoadingBackground = styled.div`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow-y: hidden;
  z-index: 1000;
  transition: 0.3s;
  background: rgba(242, 242, 242, 0.4);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
