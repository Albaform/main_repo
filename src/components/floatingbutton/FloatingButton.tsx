import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FloatingButton({
  $myAlbaform,
  $albaformDetail,
  role,
  isScrapped,
  handleToggleScrap,
  postScrapPending,
  handleShare,
}: {
  $myAlbaform?: boolean;
  $albaformDetail?: boolean;
  role?: 'OWNER' | 'APPLICANT';
  isScrapped?: boolean;
  handleToggleScrap?: () => void;
  postScrapPending?: boolean;
  handleShare?: () => void;
}) {
  const router = useRouter();

  if (role === 'OWNER') return;

  return (
    <>
      {role === 'APPLICANT' && $albaformDetail ? (
        <div className='fixed bottom-[calc(100px+theme(spacing.safe-bottom))] right-[120px] min-xlg:right-[calc((100vw-1480px)/2)] max-lg:right-[24px] cursor-pointer z-[10] max-lg:bottom-[calc(260px+theme(spacing.safe-bottom))]'>
          <button
            className={`block rounded-[50%] w-[64px] h-[64px] content-center justify-items-center mb-4 shadow-grayTop shadow-gray disabled:cursor-not-allowed ${
              isScrapped ? 'bg-orange-100' : 'bg-white'
            }`}
            disabled={postScrapPending}
            onClick={handleToggleScrap}
          >
            <Image
              src={`/images/floatingbutton/${
                isScrapped ? 'iconScrapActive.svg' : 'iconScrap.svg'
              }`}
              alt='스크랩'
              width={16}
              height={20}
              className='relative'
            />
          </button>
          <button
            className='block rounded-[50%] bg-primary-orange300 w-[64px] h-[64px] content-center justify-items-center'
            onClick={handleShare}
          >
            <Image
              src='/images/floatingbutton/iconShare.svg'
              alt='공유하기'
              width={24}
              height={24}
              className='relative'
            />
          </button>
        </div>
      ) : (
        <div
          className='fixed rounded-[50%] bg-primary-orange300 w-[64px] h-[64px] content-center justify-items-center bottom-[calc(100px+theme(spacing.safe-bottom))] right-[120px] min-xlg:right-[calc((100vw-1480px)/2)] max-md:right-[24px] cursor-pointer'
          onClick={() =>
            router.push(
              `${$myAlbaform ? '/createAlbaform/owner' : '/albatalk/new'}`,
            )
          }
        >
          <Image
            src={`/images/floatingbutton/${
              $myAlbaform ? 'iconPlus.svg' : 'iconWrite.svg'
            }`}
            alt='작성하기'
            width={36}
            height={36}
            className={`relative ${!$myAlbaform && 'top-[-2px] left-[-1px]'}`}
          />
        </div>
      )}
    </>
  );
}
