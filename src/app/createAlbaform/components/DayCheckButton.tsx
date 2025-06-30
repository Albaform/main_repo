import React from 'react';
import styled from 'styled-components';

const days = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

function DayCheckButton({ selectedDays, setSelectedDays }: Props) {
  const handleDayClick = (day: string) => {
    setSelectedDays(
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day],
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '18px',
          marginTop: '12px',
        }}
      >
        {days.map((day) => (
          <WeekButton
            key={day}
            type='button'
            selected={selectedDays.includes(day)}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </WeekButton>
        ))}
      </div>
    </div>
  );
}

const WeekButton = styled.button<{ selected?: boolean }>`
  border: none;
  background: ${({ selected }) =>
    selected ? 'var(--primary-orange300)' : 'var(--background200)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--gray500)')};
  border-radius: 10px;
  width: 48px;
  height: 48px;
  font-size: 16px;
  margin-right: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-right: 0;
  }
`;

export default DayCheckButton;
