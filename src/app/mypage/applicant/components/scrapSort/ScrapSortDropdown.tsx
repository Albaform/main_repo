import { DropdownButton } from './styles';
import { SortDropdownProps } from './type';

export default function ScrapSortDropdown({
  isSort,
  setIsSort,
}: SortDropdownProps) {
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
