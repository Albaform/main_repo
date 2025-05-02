'use client';
import styled from "styled-components";
//SearchBar
export const SearchBarWrapper = styled.div`
  width: 1920px;
  height: 112px;
  padding: 24px 471px 24px 220px;
`;

export const SearchBarContainer = styled.div`
  width: 1229px;
  height: 64px;
  background-color: var(--background200);
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  gap: 12px;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 18px;
  color: var(--gray900);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--gray400);
  }
`;

//ListFilter

export const FilterWrapper = styled.div`
    width: 100%;
    height: 90px;
    padding: 24px 220px;
`

export const FilterContainer = styled.div`
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: space-between;
`

export const FilterGroup = styled.div`
    width: 268px;
    height: 42px;
    display: flex;
    gap: 16px;
    align-items: center;

`

export const Filter = styled.div`

`

//ListCard
export const ListCardContainer = styled.div`
    width: 477px;
    height: 536px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const BannerImg = styled.div`
    width: 100%;
    height: 304px;
    border-radius: 16px;
`

export const BottomCard = styled.div`
    width: 100%;
    height: 208px;
    display: flex;
    flex-direction: column;
`
export const BottomSectionFirst = styled.div`
    width: 100%;
    height: 38px;
    display: flex;
    align-items: center;
`

export const Tag = styled.div`
    background-color: #FFF7EB;
    color: var(--primary-orange300);
    justify-content: center;
    align-items: center;
`
