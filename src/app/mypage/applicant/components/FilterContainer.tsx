import { SlideBg, TabButton, TabWrapper } from '../../styles';
import { FilterContainerProps } from '../../types';
import PostSortButton from '@/components/postSort/PostSortButton';
import ScrapSortButton from './scrapSort/ScrapSortButton';
import PublicSortButton from './publicSort/PublicSortButton';
import RecruitingSortButton from './recruitingSort/RecruitingSortButton';

export default function FilterContainer({
  selectedTab,
  setSelectedTab,
  isSort: isPostSort,
  setIsSort: setIsPostSort,
  isScrapSort,
  setIsScrapSort,
  isPublic,
  setIsPublic,
  isRecruiting,
  setIsRecruiting,
}: FilterContainerProps) {
  const handleTabClickPost = () => {
    setSelectedTab('post');
    setIsPostSort('mostRecent');
  };

  const handleTabClickComment = () => {
    setSelectedTab('comment');
  };

  const handleTabClickScrap = () => {
    setSelectedTab('scrap');
    setIsPostSort('mostRecent');
  };
  return (
    <>
      <div className='flex justify-between items-center py-4 px-0'>
        <div className='flex bg-background-200 text-gray-400 font-normal rounded-[12px] h-[50px] p-1.5 max-md:text-[14px]'>
          <TabWrapper>
            <SlideBg $activeTab={selectedTab} $applicant />
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
            <TabButton
              type='button'
              $active={selectedTab === 'scrap'}
              onClick={handleTabClickScrap}
            >
              스크랩
            </TabButton>
          </TabWrapper>
        </div>
        {selectedTab === 'post' && (
          <PostSortButton isSort={isPostSort} setIsSort={setIsPostSort} />
        )}
      </div>
      {selectedTab === 'scrap' && (
        <div className='flex justify-between items-center py-4 px-0 mb-4'>
          <div className='flex justify-between items-center'>
            <PublicSortButton isSort={isPublic} setIsSort={setIsPublic} />
            <RecruitingSortButton
              isSort={isRecruiting}
              setIsSort={setIsRecruiting}
            />
          </div>
          <ScrapSortButton isSort={isScrapSort} setIsSort={setIsScrapSort} />
        </div>
      )}
    </>
  );
}
