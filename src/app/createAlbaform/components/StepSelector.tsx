'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import {
  StepButton,
  StepLabel,
  StepIndex,
  WritingBadge,
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownItem,
} from './Selector.styles';

interface StepSelectorProps {
  currentStep: 'info' | 'condition' | 'work';
  setCurrentStep: (step: 'info' | 'condition' | 'work') => void;
  isStepInProgress: (step: 'info' | 'condition' | 'work') => boolean;
}

const steps = [
  { key: 'info', label: '모집 내용', index: 1 },
  { key: 'condition', label: '모집 조건', index: 2 },
  { key: 'work', label: '근무 조건', index: 3 },
] as const;

export default function StepSelector({
  currentStep,
  setCurrentStep,
  isStepInProgress,
}: StepSelectorProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <>
      {/* 데스크탑: 사이드바 */}
      <div
        className='hidden 
          min-[1025px]:flex flex-col gap-2 h-[460px]
          px-5 py-6 w-[320px] bg-[#F7F7F7] rounded-xl shadow-sm'
      >
        {steps.map(({ key, label, index }) => (
          <StepButton
            key={key}
            selected={currentStep === key}
            onClick={() => setCurrentStep(key)}
          >
            <StepLabel>
              <StepIndex selected={currentStep === key}>{index}</StepIndex>
              {label}
            </StepLabel>
            {isStepInProgress(key) && (
              <WritingBadge selected={currentStep === key}>작성중</WritingBadge>
            )}
          </StepButton>
        ))}
      </div>

      {/* 모바일/태블릿: 드롭다운 */}
      <div className='block min-[1025px]:hidden w-full mb-4'>
        <DropdownContainer ref={outRef}>
          <DropdownHeader selected onClick={() => setDropdown(!dropdown)}>
            <span>
              <StepIndex selected>
                {steps.find((s) => s.key === currentStep)?.index}
              </StepIndex>
              {steps.find((s) => s.key === currentStep)?.label}
              {isStepInProgress(currentStep) && (
                <WritingBadge selected>작성중</WritingBadge>
              )}
            </span>
            {dropdown ? (
              <ChevronUp size={24} color='var(--white)' />
            ) : (
              <ChevronDown size={24} color='var(--white)' />
            )}
          </DropdownHeader>

          {/* 드롭다운 리스트 */}
          {dropdown && (
            <DropdownList>
              {steps
                .filter((s) => s.key !== currentStep)
                .map(({ key, label, index }) => (
                  <DropdownItem
                    key={key}
                    onClick={() => {
                      setCurrentStep(key);
                      setDropdown(false);
                    }}
                  >
                    <StepIndex>{index}</StepIndex>
                    {label}
                    {isStepInProgress(key) && (
                      <WritingBadge>작성중</WritingBadge>
                    )}
                  </DropdownItem>
                ))}
            </DropdownList>
          )}
        </DropdownContainer>
      </div>
    </>
  );
}
