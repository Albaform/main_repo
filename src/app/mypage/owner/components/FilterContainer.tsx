import { SlideBg, TabButton, TabWrapper } from '../../styles';
import { FilterContainerProps } from '../../types';
import PostSortButton from '@/components/postSort/PostSortButton';

export default function FilterContainer({
  selectedTab,
  setSelectedTab,
  isSort,
  setIsSort,
}: FilterContainerProps) {
  const handleTabClickPost = () => {
    setSelectedTab('post');
    setIsSort('mostRecent');
  };

  const handleTabClickComment = () => {
    setSelectedTab('comment');
    setIsSort('mostRecent');
  };

  return (
    <>
      <div className='flex justify-between items-center py-4 px-0'>
        <div className='flex bg-background-200 text-gray-400 font-normal rounded-[12px] h-[50px] p-1.5 max-md:text-[14px]'>
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
          <PostSortButton isSort={isSort} setIsSort={setIsSort} />
        )}
      </div>
    </>
  );
}
