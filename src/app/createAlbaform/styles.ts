import { media } from '@/styles/media';
import styled from 'styled-components';

export const ApplyFormResponsive = styled.div`
  position: relative;
  min-height: 100%;
  padding: 88px 0 calc(env(safe-area-inset-bottom) + 62px);
  width: calc(100vw * (640 / 1920));
  max-width: 1000px;
  min-width: 640px;
  margin: 0 auto;

  @media ${media.tablet} {
    padding: 60px 24px calc(env(safe-area-inset-bottom) + 62px);
    width: 100%;
    min-width: auto;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 54px 24px calc(env(safe-area-inset-bottom) + 62px);
  }
`;
