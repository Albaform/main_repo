import { Dispatch, SetStateAction } from 'react';

export interface SearchContainerProps {
  $applicant?: boolean;
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

export interface ApplicantListData {
  updatedAt: string;
  createdAt: string;
  status: string;
  resumeName: string;
  resumeId: number;
  form: FormData;
  id: number;
}

export interface ApplicantListProps {
  listData: ApplicantListData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

export interface OwnerListData {
  updatedAt: string;
  createdAt: string;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  title: string;
  id: number;
}

export interface OwnerListProps {
  listData: OwnerListData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  setPostId: Dispatch<SetStateAction<number | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<
    SetStateAction<
      | 'editUser'
      | 'editPassword'
      | 'deletePost'
      | 'deleteComment'
      | 'cancelScrap'
      | 'deleteForms'
    >
  >;
}

export interface KebabDropdownProps {
  postId: number;
  setPostId?: Dispatch<SetStateAction<number | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<
    SetStateAction<
      | 'editUser'
      | 'editPassword'
      | 'deletePost'
      | 'deleteComment'
      | 'cancelScrap'
      | 'deleteForms'
    >
  >;
}
