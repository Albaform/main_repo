import { PasswordWatchedFields } from '../types';

export default function usePasswordChangeDetector(
  watched: PasswordWatchedFields,
) {
  const isModified = Boolean(
    watched.newPassword &&
      watched.confirmPassword &&
      watched.newPassword === watched.confirmPassword &&
      watched.currentPassword !== '',
  );

  return { isModified };
}
