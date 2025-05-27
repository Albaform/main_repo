import React from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContent } from './Modal.styles';
import { OverlayProps } from './Modal.types';

export default function Overlay({ isOpen, onClose, children }: OverlayProps) {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent $edit onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
}
