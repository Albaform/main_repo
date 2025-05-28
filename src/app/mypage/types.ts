import { EditPasswordInput } from '@/schemas/editPasswordSchema';
import { EditUserInput } from '@/schemas/editProfileSchema';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues } from 'react-hook-form';

export interface FilterContainerProps {
  selectedTab: 'post' | 'comment';
  setSelectedTab: React.Dispatch<SetStateAction<'post' | 'comment'>>;
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsPostSort: React.Dispatch<
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
  isLoading: boolean;
  isFetchingNextPage: boolean;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mainMessage:string;
  setMainMessage: Dispatch<SetStateAction<string>>;
  subMessage:string;
  setSubMessage: Dispatch<SetStateAction<string>>;
  modalType:'editUser' | 'editPassword' | 'deletePost';
  setModalType:Dispatch<SetStateAction<'editUser' | 'editPassword' | 'deletePost'>>;
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

export interface EditModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  handleCloseModal: () => void;
  onSuccess: () => void;
}

export interface HeadProps {
  handleOpenModal: (type: 'editUser' | 'editPassword') => void;
}

export interface UserDataProps {
  id: number;
  email: string;
  imageUrl: string;
  location: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  storePhoneNumber: string;
  role: string;
  storeName: string;
}

export type InfoWatchedFields = {
  imageUrl: string;
  name: string;
  nickname: string;
  store: string;
  storeTel: string;
  phoneNumber: string;
  address: string;
};

export type PasswordWatchedFields = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type EditProfileFormProps = {
  form: FieldValues;
  user: UserDataProps;
  onSubmit: (formData: EditUserInput) => Promise<void>;
  isPending: boolean;
  isPreview: string;
  setIsPreview: Dispatch<SetStateAction<string>>;
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedImageFile: Dispatch<SetStateAction<File | null>>;
  handleCloseModal: () => void;
};

export type EditPasswordFormProps = {
  form: FieldValues;
  onSubmit: (formData: EditPasswordInput) => void;
  isPending: boolean;
  handleCloseModal: () => void;
};

export interface KebabDropdownProps{
  postId:number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType:Dispatch<SetStateAction<'editUser' | 'editPassword' | 'deletePost'>>;
}
