export default function TextContainer({ content }: { content: string }) {
  return (
    <div className='my-20'>
      {content?.split(/\n{2,}/).map((para, i) => (
        <p key={i} className='whitespace-pre-wrap'>
          {para}
        </p>
      ))}
    </div>
  );
}
