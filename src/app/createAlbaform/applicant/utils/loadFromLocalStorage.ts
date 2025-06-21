import { getStorageKey } from './getStorageKey';

export const loadFromLocalStorage = (
  userId: number,
  formId: number,
): any | null => {
  const key = getStorageKey(userId, formId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};
