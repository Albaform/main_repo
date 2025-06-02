import { Dispatch, SetStateAction } from 'react';

export interface FilterContainerProps {
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
  setIsKeyword: Dispatch<SetStateAction<string>>;
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
}

export interface ListContainerProps {
  listData: ListData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}
