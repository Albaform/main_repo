'use client';

import { useEffect, useRef } from 'react';
import { loadFromLocalStorage } from '../utils/loadFromLocalStorage';
import { saveToLocalStorage } from '../utils/saveToLocalStorage';
import { AlbaformWithResume, DraftAlbaform } from '../../types';

export const useDraft = ({
  userId,
  formId,
  data,
  setData,
}: {
  userId: number;
  formId: number;
  data: DraftAlbaform;
  setData: (data: AlbaformWithResume) => void;
}) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!userId || !formId || initialized.current) return;
    const saved = loadFromLocalStorage(userId, formId) as DraftAlbaform | null;
    if (saved) {
      setData({ ...saved, resume: null });
    }
    initialized.current = true;
  }, [userId, formId, setData]);

  useEffect(() => {
    if (!userId || !formId) return;
    const timer = setTimeout(() => {
      saveToLocalStorage(userId, formId, data);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data, userId, formId]);
};
