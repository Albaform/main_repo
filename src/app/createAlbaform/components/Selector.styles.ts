import styled from 'styled-components';

//  데스크탑 < 수정해야함!!!!!! >
export const StepButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary-orange400)' : 'var(--background200)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--black100)')};
  font-size: 18px;
  font-weight: 700;
  height: 28px;
  padding: 14px 20px 12px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StepLabel = styled.span`
  display: flex;
  align-items: center;
`;

//  데스크탑 + 테블릿 공용 : 반응형 작업 해야함!!!!!!
export const StepIndex = styled.span<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary-orange100)' : 'var(--background300)'};
  color: ${({ selected }) =>
    selected ? 'var(--primary-orange400)' : 'var(--gray200)'};
  font-size: 14px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const WritingBadge = styled.span<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary-orange300)' : 'var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--gray300)')};
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 12px;
  border: ${({ selected }) =>
    selected ? '1px solid var(--white)' : '1px solid var(--gray100)'};
  border-radius: 100px;
`;

//  테블릿 + 모바일 : 드롭다운
export const DropdownContainer = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  border: 1px solid var(--line200);
  border-radius: 16px;
`;

export const DropdownHeader = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? '#F89A05' : 'var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--black100)')};
  width: 100%;
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const DropdownList = styled.div`
  background-color: var(--white);
  overflow: hidden;
  border-radius: 16px;
`;

export const DropdownItem = styled.div`
  color: var(--black100);
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;
