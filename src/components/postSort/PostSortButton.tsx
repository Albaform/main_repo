import Image from 'next/image';
import { DropdownBox, DropdownContainer } from './PostSort.styles';
import PostSortDropdown from './PostSortDropdown';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { SortDropdownProps } from './PostSort.types';

export default function PostSortButton({
  isSort,
  setIsSort,
}: SortDropdownProps) {
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
            : isSort === 'mostCommented'
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
            <PostSortDropdown isSort={isSort} setIsSort={setIsSort} />
          </DropdownBox>
        )}
      </DropdownContainer>
    </div>
  );
}
