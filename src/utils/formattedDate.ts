export function formattedDate(date: string) {
  const formatted = new Date(date);

  const formatDate = formatted.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const result = formatDate.slice(0, formatDate.length - 1);

  return result;
}
