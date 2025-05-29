import Image from 'next/image';
import { Description, PostWrapper, Title } from '../styles';

export default function ContentsList() {
  return (
    <>
      <div className='min-lg:min-h-[500px]'>
        <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-lg:gap-y-[16px]'>
          <PostWrapper>
            <Title>
              제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다
            </Title>
            <Description>
              설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다
            </Description>
            <div className='flex items-center justify-between text-gray-500 pt-[80px] max-lg:pt-[24px] max-md:pt-[40px] font-light'>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <Image
                    src='/images/defaultProfile.svg'
                    alt='기본프로필'
                    width={26}
                    height={26}
                    className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                  />
                  <p className='max-xs:text-[14px]'>닉네임</p>
                </div>
                <p className='pl-[16px] ml-[16px] border-l border-solid border-line-200 h-[18px] leading-[18px] max-xs:text-[14px] max-xs:pl-[12px] max-xs:ml-[12px]'>
                  2020. 02. 02
                </p>
              </div>
              <div className='flex items-center'>
                <div className='flex items-center mr-[10px]'>
                  <Image
                    src='/images/mypage/comment.svg'
                    alt='댓글'
                    width={36}
                    height={36}
                  />
                  10
                </div>
                <div className='flex items-center'>
                  <Image
                    src='/images/mypage/like.svg'
                    alt='좋아요'
                    width={36}
                    height={36}
                  />
                  10
                </div>
              </div>
            </div>
          </PostWrapper>
        </div>
      </div>
    </>
  );
}
