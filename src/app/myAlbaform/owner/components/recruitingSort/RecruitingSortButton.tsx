import Image from 'next/image';
import { DropdownBox, DropdownContainer } from './styles';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import PublicSortDropdown from './RecruitingSortDropdown';
import { RecruitingSortDropdownProps } from './type';

export default function RecruitingSortButton({
  isSort,
  setIsSort,
}: RecruitingSortDropdownProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <div
      className={`min-w-[125px] px-4 py-2 rounded relative border border-solid font-regular mr-4 max-md:min-w-[80px] max-md:px-[10px] max-md:py-[6px] ${
        isSort
          ? 'border-orange-400 text-orange-400 bg-orange-100'
          : 'border-gray-200 text-black100'
      }`}
      ref={outRef}
    >
      <button
        className='flex w-full items-center justify-between'
        onClick={() => setDropdown((prev) => !prev)}
      >
        <p className='pr-1 ml-[5px] min-w-[max-content] max-md:text-[12px]'>
          {isSort ? '모집 중' : '모집 마감'}
        </p>
        <div className='relative w-6 h-6 max-md:w-4 max-md:h-4'>
          <Image
            src={
              isSort
                ? '/images/mypage/arrowDown.svg'
                : '/images/mypage/arrowUp.svg'
            }
            alt='arrow_down'
            fill
            className={
              dropdown
                ? 'rotate-180 transition-transform duration-200'
                : 'transition-transform duration-200'
            }
          />
        </div>
      </button>
      <DropdownContainer $active={dropdown}>
        {dropdown && (
          <DropdownBox>
            <PublicSortDropdown isSort={isSort} setIsSort={setIsSort} />
          </DropdownBox>
        )}
      </DropdownContainer>
    </div>
  );
}
