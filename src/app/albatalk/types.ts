import { SetStateAction } from "react";

export interface FilterContainerProps {
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}
