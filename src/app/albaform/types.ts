import { Dispatch, SetStateAction } from 'react';

export interface FilterContainerProps {
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}

export interface SearchContainerProps {
  setKeyword: Dispatch<SetStateAction<string>>;
}

export interface AlbaformListProps {
  listData: FormData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

export interface ClientAlbaformProps {
  postSort: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  recruitingSort: boolean;
  keyword: string;
  itemsPerPage: number;
}

// src/types/form.ts
export interface FormData {
  id: number;
  title: string;
  imageUrls: string[];
  applyCount: number;
  scrapCount: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormListResponse {
  nextCursor: number | null;
  data: FormData[];
}
