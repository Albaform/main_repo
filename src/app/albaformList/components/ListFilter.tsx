'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FilterContainer,
  FilterGroup,
  FilterWrapper,
  Filter,
  DropdownBox,
  DropdownContainer,
} from '../styles';
import SortDropdown from './SortDropDown';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { FilterContainerProps } from '../types';
import FilterDropdown from './FilterDropDown';

export default function ListFilter({
  isSort,
  setIsSort,
}: FilterContainerProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <FilterWrapper>
      <FilterContainer>

        <FilterGroup>
          <FilterDropdown />
        </FilterGroup>

        <Filter className='relative' ref={outRef}>
          <button
            className='flex items-center'
            onClick={() => setDropdown((prev) => !prev)}
          >
            <p className='pr-1 max-[768px]:text-[12px]'>
              {isSort === 'mostRecent'
                ? '최신순'
                : isSort === 'mostCommented'
                ? '댓글순'
                : '좋아요순'}
            </p>
            <Image
              src='/images/arrowDown.svg'
              alt='arrow_down'
              width={24}
              height={24}
              className={
                dropdown
                  ? 'rotate-180 transition-transform duration-200'
                  : 'transition-transform duration-200'
              }
            />
          </button>

          <DropdownContainer $active={dropdown}>
            {dropdown && (
              <DropdownBox>
                <SortDropdown isSort={isSort} setIsSort={setIsSort} />
              </DropdownBox>
            )}
          </DropdownContainer>
        </Filter>
      </FilterContainer>
    </FilterWrapper>
  );
}
