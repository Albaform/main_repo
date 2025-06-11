import { media } from '@/styles/media';
import styled from 'styled-components';

export const FilterResponsive = styled.div`
  position: relative;
  padding: 112px 120px 24px;
  background: var(--white);

  @media ${media.desktop} {
    padding: 112px 0 24px;
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: 112px 24px 24px;
    margin: 0;
  }

  @media ${media.tablet} {
    padding: 78px 24px 16px;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 62px 24px 8px;
  }
`;

export const SortResponsive = styled.div`
  position: relative;
  padding: 24px 120px;
  background: var(--white);

  @media ${media.desktop} {
    padding: 24px 0;
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tabletPC} {
    padding: 24px;
    margin: 0;
  }

  @media ${media.tablet} {
    padding: 16px 24px;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 8px 24px;
  }
`;

export const ListResponsive = styled.div`
  position: relative;
  min-height: 100% - 202px;
  padding: 24px 120px calc(env(safe-area-inset-bottom) + 62px);

  @media ${media.desktop} {
    padding: 24px 24px calc(env(safe-area-inset-bottom) + 62px);
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tablet} {
    padding: 16px 24px calc(env(safe-area-inset-bottom) + 62px);
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 0 24px calc(env(safe-area-inset-bottom) + 62px);
  }
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 32%;
  width: 32%;
  padding: 24px;
  position: relative;
  border: 1px solid var(--line100);
  border-radius: 16px;
  box-shadow: 4px 4px 6px 0 rgba(212, 212, 212, 0.1);
  cursor: pointer;
  background: var(--white);

  @media (max-width: 1450px) {
    min-width: 49%;
    width: 49%;
  }

  @media ${media.tabletPC} {
    flex-direction: column;
    width: 100%;
    min-width: 100%;
  }
`;

export const Title = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: 500;
`;

export const Description = styled.p`
  width: 85%;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 300;
  color: var(--gray500);
`;
