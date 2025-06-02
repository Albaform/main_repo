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
  $deleteAlbaform?: boolean;
  $deadLine?: boolean;
  $writeingForm?: boolean;
  deletePostId?: number;
  onSuccess?: () => void;
}
