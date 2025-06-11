import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FloatingButton() {
  const router = useRouter();

  return (
    <div
      className='fixed rounded-[50%] bg-primary-orange300 w-[64px] h-[64px] content-center justify-items-center bottom-[calc(100px+theme(spacing.safe-bottom))] right-[120px] min-xlg:right-[calc((100vw-1480px)/2)] max-md:right-[24px] cursor-pointer'
      onClick={() => router.push('albatalk/new')}
    >
      <Image
        src='/images/albatalk/iconWrite.svg'
        alt='작성하기'
        width={36}
        height={36}
        className='relative top-[-2px] left-[-1px]'
      />
    </div>
  );
}
