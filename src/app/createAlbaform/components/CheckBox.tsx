import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id?: string;
}

function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <CheckboxWrapper htmlFor={id}>
      <CustomCheckbox id={id} checked={checked} onChange={onChange} />
      {label}
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  margin-top: 24px;
  cursor: pointer;
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 22px;
  height: 22px;
  accent-color: var(--primary-orange300);
  border-radius: 4px;
  border: 1px solid var(--gray200);
  cursor: pointer;
`;

export default Checkbox;
