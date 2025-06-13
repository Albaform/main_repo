import { Dispatch, SetStateAction } from 'react';

export interface PublicDropdownProps {
  isSort?: boolean;
  setIsSort?: Dispatch<SetStateAction<boolean>>;
}
