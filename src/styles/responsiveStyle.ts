import { media } from '@/styles/media';
import styled from 'styled-components';

export const ResponsiveStyle = styled.div`
  padding: 0 200px;

  @media ${media.desktop} {
    padding: 0;
    max-width: 1140px;
    margin: 0 auto;
  }

  @media ${media.tablet} {
    padding: 0 24px;
    margin: 0;
  }
`;
