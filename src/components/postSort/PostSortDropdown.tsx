import { DropdownButton } from './PostSort.styles';
import { SortDropdownProps } from './PostSort.types';

export default function PostSortDropdown({
  isSort,
  setIsSort,
}: SortDropdownProps) {
  return (
    <>
      <DropdownButton
        type='button'
        $active={isSort === 'mostRecent'}
        onClick={() => {
          setIsSort('mostRecent');
        }}
      >
        최신순
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={isSort === 'mostCommented'}
        onClick={() => {
          setIsSort('mostCommented');
        }}
      >
        댓글순
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={isSort === 'mostLiked'}
        onClick={() => {
          setIsSort('mostLiked');
        }}
      >
        좋아요순
      </DropdownButton>
    </>
  );
}
