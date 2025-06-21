export const getStorageKey = (userId: number, formId: number) => {
  return `application_draft_${userId}_${formId}`;
};
