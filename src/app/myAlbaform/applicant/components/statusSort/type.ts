import { Dispatch, SetStateAction } from 'react';

export interface StatusDropdownProps {
  status:
    | ''
    | 'REJECTED'
    | 'INTERVIEW_PENDING'
    | 'INTERVIEW_COMPLETED'
    | 'HIRED';
  setStatus: Dispatch<
    SetStateAction<
      '' | 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED'
    >
  >;
}
