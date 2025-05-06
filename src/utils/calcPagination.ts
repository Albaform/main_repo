interface PaginationProps {
    page: number;
    totalItemCount: number;
    itemsPerPage: number;
    pageDisplayCount: number;
  }
  
  function calcPagination({
    page, //현재 페이지
    totalItemCount, //전체 데이터수
    itemsPerPage, //한 페이지당 데이터 수
    pageDisplayCount, //한번에 보여줄 페이지네이션 수
  }: PaginationProps) {
    const totalPages = Math.ceil(totalItemCount / itemsPerPage);
    const currentSet = Math.ceil(page / pageDisplayCount);
    const startPage = (currentSet - 1) * pageDisplayCount + 1;
    const endPage = Math.min(startPage + pageDisplayCount - 1, totalPages);
  
    return {
      totalPages,
      currentSet,
      startPage,
      endPage,
      hasPrev: startPage > 1,
      hasNext: endPage < totalPages,
    };
  }
  