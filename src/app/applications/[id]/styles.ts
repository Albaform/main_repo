import { media } from '@/styles/media';
import styled from 'styled-components';

type DetailResponsiveProps = {
  $section1?: boolean;
};

export const DetailResponsive = styled.div<DetailResponsiveProps>`
  position: relative;
  padding: 88px 120px calc(env(safe-area-inset-bottom) + 90px);

  @media ${media.desktop} {
    padding: 88px 0 calc(env(safe-area-inset-bottom) + 90px);
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: ${({ $section1 }) =>
      $section1
        ? '88px 24px 90px'
        : '88px 24px calc(env(safe-area-inset-bottom) + 90px)'};
  }

  @media ${media.tablet} {
    padding: ${({ $section1 }) =>
      $section1
        ? '60px 24px 90px'
        : '60px 24px calc(env(safe-area-inset-bottom) + 90px)'};
    margin: 0;
  }

  @media ${media.mobile} {
    padding: ${({ $section1 }) =>
      $section1
        ? '54px 24px 90px'
        : '54px 24px calc(env(safe-area-inset-bottom) + 90px)'};
  }
`;
