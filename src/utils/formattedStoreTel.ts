export const formattedStoreTel = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '');

  // 대표번호 (1588, 1600 등)
  if (/^(15|16|18)\d{2}/.test(onlyNums)) {
    if (onlyNums.length <= 4) return onlyNums;
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}`;
  }

  // 서울 지역번호 (02)
  if (onlyNums.startsWith('02')) {
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 5)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    if (onlyNums.length <= 9)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 5)}-${onlyNums.slice(
        5,
      )}`;
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(
      6,
      10,
    )}`;
  }

  // 나머지 지역번호 (031, 051 등)
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
