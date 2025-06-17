export const statusMap = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접 대기',
  INTERVIEW_COMPLETED: '면접 완료',
  HIRED: '채용 완료',
} as const;

export const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, value]) => [value, key]),
) as Record<(typeof statusMap)[keyof typeof statusMap], keyof typeof statusMap>;
