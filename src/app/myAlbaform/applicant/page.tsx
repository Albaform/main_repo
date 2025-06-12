'use client';

import { getItemsPerPage } from '@/app/albatalk/utils/getItemsPerPage';
import { useState } from 'react';
import { FilterResponsive, ListResponsive, SortResponsive } from '../styles';
import SearchContainer from '../components/SearchContainer';
import StatusSortButton from './components/statusSort/StatusSortButton';
import { useMyApplications } from '@/hooks/query/useMyApplications';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import ContentsList from './components/ContentsList';

export default function myAlbaform() {
  const [status, setStatus] = useState<
    '' | 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED'
  >('');
  const [keyword, setKeyword] = useState('');

  const itemsPerPage = getItemsPerPage();

  const {
    data: applicationsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useMyApplications(itemsPerPage, status, keyword);

  const listData = applicationsData?.pages.flatMap((page) => page.result) ?? [];

  const observerRef = useInfiniteScroll(hasNextPage!, fetchNextPage!);

  return (
    <div className='h-[100%] bg-background-100'>
      <div className='border-solid border-b-[1px] border-line-100 bg-white'>
        <div className='border-solid border-b-[1px] border-line-100'>
          <FilterResponsive>
            <SearchContainer $applicant setKeyword={setKeyword} />
          </FilterResponsive>
        </div>
        <SortResponsive>
          <StatusSortButton status={status} setStatus={setStatus} />
        </SortResponsive>
      </div>
      <ListResponsive>
        <ContentsList
          listData={listData}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </ListResponsive>
      {hasNextPage && <div ref={observerRef} style={{ height: '1px' }} />}
    </div>
  );
}
