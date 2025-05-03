import { SetStateAction } from 'react';

export interface FilterContainerProps {
  selectedTab: 'post' | 'comment';
  setSelectedTab: React.Dispatch<SetStateAction<'post' | 'comment'>>;
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}

export interface SortDropdownProps {
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}

export interface ListContainerProps {
  selectedTab: 'post' | 'comment';
  listData: ListData[];
}

type WriterData = {
  id: number;
  imageUrl?: string;
  nickname: string;
};

type PostData = {
  id: number;
  title: string;
  content: string;
};

export interface ListData {
  id: number;
  imageUrl?: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
  likeCount?: number;
  writer?: WriterData;

  post?: PostData;

  isPublic?: boolean;
  scrapCount?: number;
  applyCount?: number;
  imageUrls?: string[];
  recruitmentEndDate?: string;
  recruitmentStartDate?: string;
}
