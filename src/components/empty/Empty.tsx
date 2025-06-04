import Image from 'next/image';
import { EmptyContainer } from './Empty.styles';
import { EmptyProps } from './Empty.types';

export default function Empty({
  selectedTab,
  albaform,
  albatalk,
  comments,
}: EmptyProps) {
  const tabPostText = () => {
    return (
      <>
        작성한 게시글이 없어요.
        <br />
        궁금한 점, 고민 등의 게시글을 올려보세요.
      </>
    );
  };

  const tabCommentText = () => {
    return <>작성한 댓글이 없어요.</>;
  };

  const albaformText = () => {
    return (
      <>
        등록된 알바폼이 없어요.
        <br />
        1분 만에 등록하고 알바를 구해보세요!
      </>
    );
  };

  const albatalkText = () => {
    return (
      <>
        등록된 알바토크가 없어요.
        <br />
        궁금한 점이 있다면 먼저 게시글을 작성해보세요!
      </>
    );
  };

  const commentsText = () => {
    return (
      <>
        등록된 댓글이 없어요.
        <br />
        먼저 댓글을 작성해보세요!
      </>
    );
  };

  const renderContent = () => {
    if (albaform) return albaformText();
    if (albatalk) return albatalkText();
    if (comments) return commentsText();
    if (selectedTab === 'post') return tabPostText();
    if (selectedTab === 'comment') return tabCommentText();
  };

  return (
    <EmptyContainer>
      <Image
        src={
          albaform ? '/images/empty/albaform.svg' : '/images/empty/mypage.svg'
        }
        alt='마이페이지'
        width={120}
        height={120}
      />
      <p className='mt-[30px] text-gray400 text-center font-light'>
        {renderContent()}
      </p>
    </EmptyContainer>
  );
}
