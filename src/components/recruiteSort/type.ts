import { SetStateAction } from 'react';

export interface RecruitSortDropdownProps {
  isSort?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  setIsSort?: React.Dispatch<
    SetStateAction<
      'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
    >
  >;
}
