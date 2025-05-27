'use client';

import { useState } from 'react';

export function useModalController() {
  const [showModal, setShowModal] = useState(false);
  const [mainMessage, setMainMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');

  return {
    showModal: showModal ?? false,
    setShowModal: setShowModal ?? (() => {}),
    mainMessage: mainMessage ?? '',
    setMainMessage: setMainMessage ?? (() => {}),
    subMessage: subMessage ?? '',
    setSubMessage: setSubMessage ?? (() => {}),
  };
}
