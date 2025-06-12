export interface OverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  mainMessage: string;
  subMessage?: string;
  $deletePost?: boolean;
  $deleteForm?: boolean;
  $deleteComment?: boolean;
  $deleteAlbaform?: boolean;
  $deadLine?: boolean;
  $writeingForm?: boolean;
  $deleteScrap?: boolean;
  deletePostId?: number;
  onSuccess?: () => void;
}
