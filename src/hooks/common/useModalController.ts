'use client';

import { useState } from 'react';

export function useModalController() {
  const [showModal, setShowModal] = useState(false);
  const [mainMessage, setMainMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const [modalType, setModalType] = useState<
    'editUser' | 'editPassword' | 'deletePost' | 'deleteComment' | 'cancelScrap'
  >('editUser');

  return {
    showModal: showModal ?? false,
    setShowModal: setShowModal ?? (() => {}),
    mainMessage: mainMessage ?? '',
    setMainMessage: setMainMessage ?? (() => {}),
    subMessage: subMessage ?? '',
    setSubMessage: setSubMessage ?? (() => {}),
    modalType: modalType ?? '',
    setModalType: setModalType ?? (() => {}),
  };
}
