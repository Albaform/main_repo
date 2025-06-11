import Image from 'next/image';
import { useClickOutside } from '@/hooks/common/useClickOutside';
import { DropdownBox, DropdownContainer } from './styles';
import { StatusDropdownProps } from './type';
import StatusSortDropdown from './StatusSortDropdown';

export default function StatusSortButton({
  status,
  setStatus,
}: StatusDropdownProps) {
  const { outRef, dropdown, setDropdown } = useClickOutside();
  return (
    <>
      <div
        className='w-[130px] px-4 py-2 rounded relative border border-solid font-light border-gray-200 text-black100 max-md:w-[100px] max-md:px-[10px] max-md:py-[6px]'
        ref={outRef}
      >
        <button
          className='flex w-full items-center justify-between'
          onClick={() => setDropdown((prev) => !prev)}
        >
          <p className='pr-1 ml-[5px] min-w-[max-content] max-md:text-[12px]'>
            {status === ''
              ? '전체'
              : status === 'REJECTED'
              ? '거절'
              : status === 'INTERVIEW_PENDING'
              ? '면접 대기'
              : status === 'INTERVIEW_COMPLETED'
              ? '면접 완료'
              : status === 'HIRED'
              ? '채용 완료'
              : ''}
          </p>
          <div className='relative w-6 h-6 max-md:w-4 max-md:h-4'>
            <Image
              src='/images/arrowDown.svg'
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
              <StatusSortDropdown status={status} setStatus={setStatus} />
            </DropdownBox>
          )}
        </DropdownContainer>
      </div>
    </>
  );
}
