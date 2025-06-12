'use client';

import { useState } from 'react';
import SearchContainer from '../components/SearchContainer';
import { FilterResponsive, SortResponsive } from '../styles';
import PublicSortButton from './components/publicSort/PublicSortButton';
import RecruitingSortButton from './components/recruitingSort/RecruitingSortButton';
import RecruitSortButton from '@/components/recruiteSort/RecruitSortButton';
import ContentsList from './components/ContentsList';
import { useMyForms } from '@/hooks/query/useMyForms';
import { getItemsPerPage } from './utils/getItemsPerPage';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import { useModalController } from '@/hooks/common/useModalController';

export default function myAlbaform() {
  const [postId, setPostId] = useState<number>();
  const [postSort, setPostSort] = useState<
    'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'
  >('mostRecent');
  const [publicSort, setPublicSort] = useState(true);
  const [recruitingSort, setRecruitingSort] = useState(true);
  const [keyword, setKeyword] = useState('');

  const {
    showModal,
    setShowModal,
    mainMessage,
    setMainMessage,
    subMessage,
    setSubMessage,
    modalType,
    setModalType,
  } = useModalController();

  const itemsPerPage = getItemsPerPage();

  const {
    data: formsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useMyForms(itemsPerPage, postSort, publicSort, recruitingSort, keyword);

  const listData = formsData?.pages.flatMap((page) => page.result) ?? [];

  const observerRef = useInfiniteScroll(hasNextPage!, fetchNextPage);

  return (
    <div className='h-[100%] bg-background-100'>
      <div className='border-solid border-b-[1px] border-line-100 bg-white'>
        <FilterResponsive>
          <SearchContainer setKeyword={setKeyword} />
        </FilterResponsive>
      </div>
      <SortResponsive $type2>
        <div className='flex items-center justify-between mb-[80px] max-lg:mb-[28px] max-xs:mb-[23px]'>
          <div className='flex items-center'>
            <PublicSortButton isSort={publicSort} setIsSort={setPublicSort} />
            <RecruitingSortButton
              isSort={recruitingSort}
              setIsSort={setRecruitingSort}
            />
          </div>
          <RecruitSortButton isSort={postSort} setIsSort={setPostSort} />
        </div>
        <ContentsList
          listData={listData}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          setPostId={setPostId}
          setShowModal={setShowModal}
          setMainMessage={setMainMessage}
          setSubMessage={setSubMessage}
          setModalType={setModalType}
        />
      </SortResponsive>
      {hasNextPage && <div ref={observerRef} style={{ height: '1px' }} />}
    </div>
  );
}
