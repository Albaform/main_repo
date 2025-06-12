import { DropdownButton } from './styles';
import { RecruitSortDropdownProps } from './type';

export default function RecruitSortDropdown({
  isSort,
  setIsSort,
}: RecruitSortDropdownProps) {
  return (
    <>
      <DropdownButton
        type='button'
        $active={isSort === 'mostRecent'}
        onClick={() => {
          setIsSort?.('mostRecent');
        }}
      >
        최신순
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={isSort === 'highestWage'}
        onClick={() => {
          setIsSort?.('highestWage');
        }}
      >
        급여순
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={isSort === 'mostApplied'}
        onClick={() => {
          setIsSort?.('mostApplied');
        }}
      >
        지원자순
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={isSort === 'mostScrapped'}
        onClick={() => {
          setIsSort?.('mostScrapped');
        }}
      >
        스크랩순
      </DropdownButton>
    </>
  );
}
