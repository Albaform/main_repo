'use client';

import FilterContainer from './components/FilterContainer';
import { useState } from 'react';
import { FilterResponsive, ListResponsive } from './styles';
import ContentsList from './components/ContentsList';
import FloatingButton from './components/FloatingButton';

export default function AlbaTalk() {
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  return (
    <>
      <div className='border-solid border-b-[1px] border-line-100 max-xs:border-b-[0px]'>
        <FilterResponsive>
          <FilterContainer isSort={isSort} setIsSort={setIsSort} />
        </FilterResponsive>
      </div>
      <ListResponsive>
        <ContentsList />
      </ListResponsive>
      <FloatingButton />
    </>
  );
}
