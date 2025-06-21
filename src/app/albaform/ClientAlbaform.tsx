'use client';

import { useState } from 'react';
import { FilterResponsive, SortResponsive } from './styles';
import SearchContainer from './components/SearchContainer';
import RecruitingSortButton from './components/recruitingSort/RecruitingSortButton';
import RecruitSortButton from '@/components/recruiteSort/RecruitSortButton';
import ContentsList from './components/ContentsList';
import FloatingButton from '@/components/floatingbutton/FloatingButton';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import { useAlbaForms } from '@/hooks/query/useGetForms';
import { ClientAlbaformProps } from './types';
import { useGetMyInfo } from '@/hooks/query/useGetUser';

export default function ClientAlbaform({
  initialParams,
}: {
  initialParams: ClientAlbaformProps;
}) {
  const [postSort, setPostSort] = useState<
    'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
  >(initialParams.postSort);
  const [recruitingSort, setRecruitingSort] = useState(
    initialParams.recruitingSort,
  );
  const [keyword, setKeyword] = useState(initialParams.keyword);

  const {
    data,
    isLoading: getAlbaformsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAlbaForms(
    initialParams.itemsPerPage,
    postSort,
    recruitingSort,
    keyword,
  );

  const { data: user, isLoading: getUserLoading } = useGetMyInfo();

  const isLoading = getAlbaformsLoading || getUserLoading;

  const listData = data?.pages.flatMap((page) => page.result) ?? [];

  const observerRef = useInfiniteScroll(hasNextPage!, fetchNextPage);

  return (
    <>
      <div className='h-[100%] bg-background-100'>
        <div className='border-solid border-b-[1px] border-line-100 bg-white'>
          <FilterResponsive>
            <SearchContainer setKeyword={setKeyword} />
          </FilterResponsive>
        </div>
        <div></div>
        <div className=' border-solid border-b-[1px] border-line-100'>
          <SortResponsive $type3>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <RecruitingSortButton
                  isSort={recruitingSort}
                  setIsSort={setRecruitingSort}
                />
              </div>
              <RecruitSortButton isSort={postSort} setIsSort={setPostSort} />
            </div>
          </SortResponsive>
        </div>
        <SortResponsive $list>
          <ContentsList
            listData={listData}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </SortResponsive>
        {hasNextPage && <div ref={observerRef} style={{ height: 1 }} />}
      </div>
      {user?.role === 'OWNER' && !isLoading && <FloatingButton $myAlbaform />}
    </>
  );
}
