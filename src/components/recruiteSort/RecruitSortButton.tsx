import Image from 'next/image';
import { DropdownBox, DropdownContainer } from './styles';
import RecruitSortDropdown from './RecruitSortDropdown';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { RecruitSortDropdownProps } from './type';

export default function RecruitSortButton({
  isSort,
  setIsSort,
}: RecruitSortDropdownProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <div className='relative' ref={outRef}>
      <button
        className='flex items-center'
        onClick={() => setDropdown((prev) => !prev)}
      >
        <p className='pr-1 ml-[5px] min-w-[max-content] max-md:text-[12px]'>
          {isSort === 'mostRecent'
            ? '최신순'
            : isSort === 'highestWage'
            ? '급여순'
            : isSort === 'mostApplied'
            ? '지원자순'
            : '스크랩순'}
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
            <RecruitSortDropdown isSort={isSort} setIsSort={setIsSort} />
          </DropdownBox>
        )}
      </DropdownContainer>
    </div>
  );
}
