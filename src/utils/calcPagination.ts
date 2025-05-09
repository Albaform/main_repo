interface PaginationProps {
  page: number;
  totalPages: number;
  pageDisplayCount: number;
}

export default function calcPagination({
  page, //현재 페이지
  totalPages,
  pageDisplayCount, //한번에 보여줄 페이지네이션 수
}: PaginationProps) {
  const currentSet = Math.ceil(page / pageDisplayCount);
  const startPage = (currentSet - 1) * pageDisplayCount + 1;
  const endPage = Math.min(startPage + pageDisplayCount - 1, totalPages);

  return {
    currentSet,
    startPage,
    endPage,
    hasPrev: startPage > 1,
    hasNext: endPage < totalPages,
  };
}
