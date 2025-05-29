import { FieldErrors } from 'react-hook-form';
import { PasswordWatchedFields } from '../types';

export default function usePasswordChangeDetector(
  watched: PasswordWatchedFields,
  errors: FieldErrors<PasswordWatchedFields> = {},
) {
  const hasError =
    !!errors.currentPassword ||
    !!errors.newPassword ||
    !!errors.confirmPassword;

  const isModified = Boolean(
    watched.currentPassword !== '' &&
      watched.newPassword !== '' &&
      watched.confirmPassword !== '' &&
      watched.newPassword === watched.confirmPassword &&
      !hasError,
  );

  return { isModified };
}
