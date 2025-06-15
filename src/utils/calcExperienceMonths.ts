export function calcExperienceMonths(months: number): string {
  if (months === 0) return '없음';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearStr = years > 0 ? `${years}년` : '';
  const monthStr = remainingMonths > 0 ? `${remainingMonths}개월` : '';

  return [yearStr, monthStr].filter(Boolean).join(' ');
}
