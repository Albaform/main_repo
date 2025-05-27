import styled, { css } from "styled-components";

type ButtonProps = {
    $active?:boolean
}

export const PaginationWrapper = styled.ul`
  -webkit-display: flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

export const PaginationButton = styled.li<ButtonProps>`
  position: relative;
  width: 40px;
  height: 40px;
  line-height:40px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  color: var(--gray100);

  ${({$active}) => $active && css`
    color:var(--black400)
  `}
`

export const PageController = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  line-height:40px;
  text-align: center;
  cursor:pointer
`