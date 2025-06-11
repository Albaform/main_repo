import styled from 'styled-components';
import { FormInput } from './Form.styles';

//  달력 커스텀 인풋
export const CustomDateInput = styled(FormInput)`
  cursor: pointer;

  &:focus {
    border: 0.5px solid var(--gray200);
    padding: 13px 13px 11px 13px;
  }
`;

//  react-datepicker 커스터마이징
export const StyledDatePickerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  margin-top: 4px;

  .react-datepicker {
    background-color: var(--white);
    box-shadow: 0 1px 4px rgba(130, 130, 130, 0.08);
    border: 0.5px solid var(--gray100);
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .react-datepicker__navigation {
    margin: 24px 14px 0;
  }

  .react-datepicker__header {
    background-color: var(--white);
    border-bottom: none;
    padding-bottom: 12px;
  }

  .react-datepicker__current-month {
    font-size: 15px;
    font-weight: 600;
    padding-bottom: 12px;
  }

  .react-datepicker__day {
    color: var(--black400);

    &:hover {
      background-color: var(--primary-orange200);
    }
  }

  .react-datepicker__day-name {
    color: var(--gray500);
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    font-size: 14px;
    line-height: 40px;
    width: 40px;
    height: 40px;
    margin: 4px;
    border-radius: 50%;
    text-align: center;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }
  .react-datepicker__day--today {
    background-color: var(--primary-orange200);
  }

  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: var(--primary-orange100);
    color: var(--black400);
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--selected {
    background-color: var(--primary-orange400);
    color: var(--white);
  }

  .react-datepicker__day--outside-month {
    color: var(--gray100);
  }

  @media (max-width: 1024px) {
    .react-datepicker {
      max-width: 100%;
      padding: 16px;
    }

    .react-datepicker__navigation {
      margin-top: 16px;
    }

    .react-datepicker__day,
    .react-datepicker__day-name {
      font-size: 13px;
      line-height: 36px;
      width: 36px;
      height: 36px;
      margin: 2px;
    }
  }
`;
