import Image from 'next/image';
import { EmptyContainer } from './Empty.styles';
import { EmptyProps } from './Empty.types';

export default function Empty({
  selectedTab,
  albaform,
  albatalk,
  comments,
  applications,
  myAlbaform,
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

  const tabScrapsText = () => {
    return <>스크랩한 알바폼이 없어요.</>;
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

  const applicationsText = () => {
    return (
      <>
        지원한 알바폼이 없어요.
        <br />
        알바폼을 둘러보고 지원해보세요!
      </>
    );
  };

  const myAlbaformText = () => {
    return (
      <>
        표시할 알바폼이 없어요.
        <br />
        1분 만에 등록하고 알바를 구해보세요!
      </>
    );
  };

  const renderContent = () => {
    if (albaform) return albaformText();
    if (albatalk) return albatalkText();
    if (comments) return commentsText();
    if (applications) return applicationsText();
    if (myAlbaform) return myAlbaformText();
    if (selectedTab === 'post') return tabPostText();
    if (selectedTab === 'comment') return tabCommentText();
    if (selectedTab === 'scrap') return tabScrapsText();
  };

  return (
    <EmptyContainer>
      <Image
        src={
          albaform
            ? '/images/empty/albaform.svg'
            : selectedTab === 'scrap'
            ? '/images/empty/scrap.svg'
            : applications || myAlbaform
            ? '/images/empty/applications.svg'
            : '/images/empty/mypage.svg'
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
