import { DropdownButton } from './styles';
import { RecruitingSortDropdownProps } from './type';

export default function RecruitingSortDropdown({
  isSort,
  setIsSort,
}: RecruitingSortDropdownProps) {
  return (
    <>
      <DropdownButton
        type='button'
        $active={isSort}
        onClick={() => {
          setIsSort?.(true);
        }}
      >
        모집 중
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={!isSort}
        onClick={() => {
          setIsSort?.(false);
        }}
      >
        모집 마감
      </DropdownButton>
    </>
  );
}
