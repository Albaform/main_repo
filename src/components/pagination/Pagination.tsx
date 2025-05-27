import Image from "next/image";
import { PaginationProps } from "./Pagination.types";
import { PaginationWrapper, PaginationButton, PageController } from "./Pagination.styles";
import calcPagination from "@/utils/calcPagination";

export default function Pagination({
  page,
  setPage,
  totalPages
}:PaginationProps) {
  const pageDisplayCount = 10;

  const { startPage, endPage, hasPrev, hasNext } = calcPagination({
    page, //현재 페이지
    totalPages, //전체 페이지수
    pageDisplayCount, //한번에 보여줄 페이지네이션 수
  });

  function generatePageNumbers({ startPage, endPage }:{startPage:number; endPage:number}) {
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  return (
    <PaginationWrapper>
      {hasPrev && (
        <PageController onClick={() => setPage(startPage - pageDisplayCount)}>
          <Image src="/images/iconPrev.svg" alt="<" width={24} height={24}/>
        </PageController>
      )}
      {generatePageNumbers({ startPage, endPage }).map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          $active={page === pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      {hasNext && (
        <PageController onClick={() => setPage(endPage + 1)}>
          <Image src="/images/iconNext.svg" alt=">" width={24} height={24} />
        </PageController>
      )}
    </PaginationWrapper>
  );
}