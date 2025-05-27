'use client';

import React from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useClickOutside } from '@/utils/useClickOutside';

interface DropdownProps {
  label?: string;
  value: string | number;
  options: (string | number)[];
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export default function InputDropdown({
  value,
  options,
  onChange,
  placeholder,
}: DropdownProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  const displayText = value || placeholder || '선택';

  return (
    <DropdownContainer ref={outRef}>
      <DropdownInput onClick={() => setDropdown((prev) => !prev)} tabIndex={0}>
        {value ? (
          <span>{value}</span>
        ) : (
          <PlaceholderText>{displayText}</PlaceholderText>
        )}
        {dropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </DropdownInput>

      {dropdown && (
        <OptionsList>
          {options.map((opt) => (
            <OptionItem
              key={opt}
              onClick={() => {
                onChange(opt);
                setDropdown(false);
              }}
            >
              {opt}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownInput = styled.div`
  background-color: var(--background200);
  color: var(--black400);
  font-size: 16px;
  height: 50px;
  padding: 14px 14px 12px 14px;
  border-radius: 8px;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:focus {
    border: 0.5px solid var(--gray200);
    padding: 13px 13px 11px 13px;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--white);
  border-radius: 8px;
  border: 0.5px solid var(--gray100);
  margin-top: 4px;
  list-style: none;
`;

const OptionItem = styled.li`
  color: var(--black100);
  font-size: 14px;
  padding: 14px 14px 12px 14px;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const PlaceholderText = styled.span`
  color: var(--gray400);
  font-size: 14px;
`;
