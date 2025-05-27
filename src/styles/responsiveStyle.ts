import { media } from '@/styles/media';
import styled from 'styled-components';

export const ResponsiveStyle = styled.div`
  position: relative;
  min-height: 100%;
  padding: 88px 120px calc(env(safe-area-inset-bottom) + 62px);

  @media ${media.desktop} {
    padding: 88px 0 calc(env(safe-area-inset-bottom) + 62px);
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tablet} {
    padding: 60px 24px calc(env(safe-area-inset-bottom) + 62px);
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 54px 24px calc(env(safe-area-inset-bottom) + 62px);
  }
`;
