export const getItemsPerPage = () => {
  if (typeof window === 'undefined') {
    return 12;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  if (height < 830) {
    if (width >= 1200 && width <= 1450) {
      return 8;
    }
    return 9;
  }
  return 12;
};
