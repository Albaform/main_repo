import { DropdownButton } from './styles';
import { PublicDropdownProps } from './type';

export default function PublicSortDropdown({
  isSort,
  setIsSort,
}: PublicDropdownProps) {
  return (
    <>
      <DropdownButton
        type='button'
        $active={isSort}
        onClick={() => {
          setIsSort?.(true);
        }}
      >
        공개
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={!isSort}
        onClick={() => {
          setIsSort?.(false);
        }}
      >
        비공개
      </DropdownButton>
    </>
  );
}
