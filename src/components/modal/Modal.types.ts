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
  deadLine?: boolean;
  writeForm?: boolean;
}
