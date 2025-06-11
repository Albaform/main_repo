import { Dispatch, SetStateAction } from 'react';

export interface FilterContainerProps {
  setKeyword: Dispatch<SetStateAction<string>>;
}

type OwnerData = {
  imageUrl: string;
  storeName: string;
  id: number;
};

type FormData = {
  owner: OwnerData;
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
  id: number;
};

export interface ListData {
  updatedAt: string;
  createdAt: string;
  status: string;
  resumeName: string;
  resumeId: number;
  form: FormData;
  id: number;
}

export interface ListContainerProps {
  listData: ListData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}
