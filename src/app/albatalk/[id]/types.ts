import { UseMutateFunction } from '@tanstack/react-query';
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
  modalType:
    | 'editUser'
    | 'editPassword'
    | 'deletePost'
    | 'deleteComment'
    | 'cancelScrap'
    | 'deleteForms';
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
  isLoading: boolean;
  isShowComments: boolean;
  totalCommentCount: number;
}

export interface CommentsProps {
  userId: number;
  postId: number;
  comments: CommentData[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mainMessage: string;
  setMainMessage: Dispatch<SetStateAction<string>>;
  subMessage: string;
  setSubMessage: Dispatch<SetStateAction<string>>;
  modalType:
    | 'editUser'
    | 'editPassword'
    | 'deletePost'
    | 'deleteComment'
    | 'cancelScrap'
    | 'deleteForms';
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
  isLoading: boolean;
  isFetching: boolean;
  onSuccess: () => void;
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

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: WriterType;
}

export interface KebabDropdownProps {
  $deletePost?: boolean;
  $deleteComment?: boolean;
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
  handleEdit?: () => void;
}

type LikePostProps = {
  postId: number;
  isLiked: boolean;
};

type ToggleLikePostFn = UseMutateFunction<any, unknown, LikePostProps, unknown>;

export interface LikeButtonProps {
  post: PostData;
  postId: number;
  toggleLikePost: ToggleLikePostFn;
  isPending: boolean;
}

export interface SkeletonProps {
  $comment?: boolean;
}

export interface CommentListProps {
  userId: number;
  setCommentId: Dispatch<SetStateAction<number | undefined>>;
  comments: CommentData[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
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

export interface EditCommentProps {
  content: string;
  editingCommentId: number;
  setEditingCommentId: Dispatch<SetStateAction<number | null>>;
}
