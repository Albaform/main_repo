import { DraftAlbaform } from '../../types';

export const saveToLocalStorage = (
  userId: number,
  formId: number,
  data: DraftAlbaform,
) => {
  const key = `albaform_draft_${userId}_${formId}`;
  localStorage.setItem(key, JSON.stringify(data));
};
