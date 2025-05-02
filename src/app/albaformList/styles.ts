'use client';
import styled from "styled-components";

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
