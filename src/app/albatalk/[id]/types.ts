import { Dispatch, SetStateAction } from 'react';

export interface PostDetailProps {
  userId: number;
  post: PostData;
  handleToggleComments: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mainMessage: string;
  setMainMessage: Dispatch<SetStateAction<string>>;
  subMessage: string;
  setSubMessage: Dispatch<SetStateAction<string>>;
  modalType: 'editUser' | 'editPassword' | 'deletePost';
  setModalType: Dispatch<
    SetStateAction<'editUser' | 'editPassword' | 'deletePost'>
  >;
  isLoading: boolean;
}

type WriterType = {
  id: number;
  imageUrl: string;
  nickname: string;
};

export interface PostData {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  writer: WriterType;
}

export interface KebabDropdownProps {
  postId: number;
  setPostId?: Dispatch<SetStateAction<number | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<
    SetStateAction<'editUser' | 'editPassword' | 'deletePost'>
  >;
}
