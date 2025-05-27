'use client';

import {
  SlideBg,
  DropdownBox,
  TabButton,
  TabWrapper,
  DropdownContainer,
} from '../../styles';
import Image from 'next/image';
import SortDropdown from './SortDropdown';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { FilterContainerProps } from '../../types';

export default function FilterContainer({
  selectedTab,
  setSelectedTab,
  isPostSort,
  setIsPostSort,
}: FilterContainerProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  const handleTabClickPost = () => {
    setSelectedTab('post');
    setIsPostSort('mostRecent');
  };

  const handleTabClickComment = () => {
    setSelectedTab('comment');
    setIsPostSort('mostRecent');
  };

  return (
    <>
      <div className='flex justify-between items-center py-4 px-0'>
        <div className='flex bg-background-200 text-gray-400 font-normal rounded-[12px] h-[50px] p-1.5 max-[768px]:text-[14px]'>
          <TabWrapper>
            <SlideBg $activeTab={selectedTab} />
            <TabButton
              type='button'
              $active={selectedTab === 'post'}
              onClick={handleTabClickPost}
            >
              내가 쓴 글
            </TabButton>
            <TabButton
              type='button'
              $active={selectedTab === 'comment'}
              onClick={handleTabClickComment}
            >
              내가 쓴 댓글
            </TabButton>
          </TabWrapper>
        </div>
        {selectedTab === 'post' && (
          <div className='relative' ref={outRef}>
            <button
              className='flex items-center'
              onClick={() => setDropdown((prev) => !prev)}
            >
              <p className='pr-1 max-[768px]:text-[12px]'>
                {isPostSort === 'mostRecent'
                  ? '최신순'
                  : isPostSort === 'mostCommented'
                  ? '댓글순'
                  : '좋아요순'}
              </p>
              <Image
                src='/images/arrowDown.svg'
                alt='arrow_down'
                width={24}
                height={24}
                className={
                  dropdown
                    ? 'rotate-180 transition-transform duration-200'
                    : 'transition-transform duration-200'
                }
              />
            </button>
            <DropdownContainer $active={dropdown}>
              {dropdown && (
                <DropdownBox>
                  <SortDropdown isSort={isPostSort} setIsSort={setIsPostSort} />
                </DropdownBox>
              )}
            </DropdownContainer>
          </div>
        )}
      </div>
    </>
  );
}
