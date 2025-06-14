import Image from 'next/image';

export default function BlockContainer({
  role,
  isLoading,
}: {
  role: 'OWNER' | 'APPLICANT';
  isLoading: boolean;
}) {
  return (
    <>
      <p className='text-3xl font-semibold mb-10'>모집 조건</p>
      <div className='border border-solid border-line-100 rounded-[8px] bg-background-100 p-6'>
        <div className='flex font-light'>
          <p className='flex-[1] text-black200'>모집인원</p>
          <p className='flex-[5] text-black400 ml-1'>
            00명 <span className='text-gray-500'>(인원미정)</span>
          </p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>성별</p>
          <p className='flex-[5] text-black400 ml-1'>성별무관</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>학력</p>
          <p className='flex-[5] text-black400 ml-1'>학력무관</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>연령</p>
          <p className='flex-[5] text-black400 ml-1'>연령무관</p>
        </div>
        <div className='flex font-light mt-4'>
          <p className='flex-[1] text-black200'>우대사항</p>
          <p className='flex-[5] text-black400 ml-1'>
            업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대
          </p>
        </div>
      </div>
      <div className='border border-solid border-line-100 rounded-[8px] bg-background-100 p-6 mt-6'>
        <div className='flex justify-between font-light'>
          <p className='text-black200'>
            모집기간
            <span className='text-orange-400 font-semibold ml-2'>D-10</span>
          </p>
          <p className='text-black400 ml-1'>2024. 05. 04. ~ 2024. 05. 17</p>
        </div>
        <div className='flex justify-between font-light mt-4'>
          <p className='text-black200'>가게 전화번호</p>
          <p className='text-black400 ml-1'>02-1234-5678</p>
        </div>
        <div className='flex justify-between font-light mt-4'>
          <p className='text-black200'>사장님 전화번호</p>
          <p className='text-black400 ml-1'>010-1234-5678</p>
        </div>
      </div>
      {!isLoading && (
        <div
          className={`mt-[46px] left-[0] right-[0] bottom-[0] rounded-t-lg border-t border-solid border-line-200 max-lg:fixed max-lg:bg-white max-lg:pt-[20px] max-lg:px-6 max-lg:pb-[calc(30px+theme(spacing.safe-bottom))] z-[10] ${
            role === 'OWNER' && 'max-lg:flex max-lg:flex-row-reverse'
          }`}
        >
          <button
            type='button'
            className='flex items-center w-full h-[68px] bg-orange-400 rounded-[8px] justify-center text-white font-semibold'
          >
            <Image
              src={
                role === 'OWNER'
                  ? '/images/albaformDetail/buttonEdit.svg'
                  : '/images/albaformDetail/buttonWriting.svg'
              }
              alt='지원하기'
              width={24}
              height={24}
              className='mr-1'
            />
            {role === 'OWNER' ? '수정하기' : '지원하기'}
          </button>
          <button
            type='button'
            className={`flex items-center w-full h-[68px] border border-solid font-semibold rounded-[8px] mt-4 justify-center ${
              role === 'OWNER'
                ? 'border-[0] bg-line-200 text-gray-400 max-lg:mt-[0] max-lg:mr-2 max-lg:max-w-[70px]'
                : 'border-orange-400 text-orange-400'
            }`}
          >
            <Image
              src={
                role === 'OWNER'
                  ? '/images/albaformDetail/buttonTrash.svg'
                  : '/images/albaformDetail/buttonApplyList.svg'
              }
              alt='내역보기'
              width={24}
              height={24}
              className='mr-1'
            />
            <p className={`${role === 'OWNER' && 'max-lg:hidden'}`}>
              {role === 'OWNER' ? '삭제하기' : '내 지원 내역 보기'}
            </p>
          </button>
        </div>
      )}
    </>
  );
}
