import { SetStateAction } from 'react';

export interface SortDropdownProps {
  isSort?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  setIsSort?: React.Dispatch<
    SetStateAction<
      'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
    >
  >;
}
