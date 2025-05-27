export const formattedPhoneNumber = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '');

  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 6)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  if (onlyNums.length <= 10)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
    )}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
    7,
    11,
  )}`;
};
