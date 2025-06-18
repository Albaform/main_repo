import { useRouter } from 'next/navigation';
import FileInputContainer from './FileInputContainer';
import TextareaContainer from './TextareaContainer';
import TextInputcontainer from './TextInputContainer';
import ButtonContainer from './ButtonContainer';

export default function FormContainer() {
  const INPUT_ITEMS = [
    {
      label: '이름',
      name: 'name',
      type: 'text',
      placeholder: '이름을 입력해주세요',
    },
    {
      label: '연락처',
      name: 'phoneNumber',
      type: 'number',
      placeholder: '숫자만 입력해주세요',
    },
    {
      label: '경력(개월 수)',
      name: 'experienceMonths',
      type: 'number',
      placeholder: '숫자만 입력해주세요',
    },
  ];
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between my-10'>
        <p className='text-[26px] font-semibold'>알바폼 지원하기</p>
        <button
          type='button'
          onClick={() => {
            router.back();
          }}
          className='h-12 rounded-[8px] bg-gray-300 text-white px-6'
        >
          작성 취소
        </button>
      </div>
      <form>
        {INPUT_ITEMS.map((item, i) => {
          return (
            <TextInputcontainer
              key={i}
              label={item.label}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
            />
          );
        })}
        <FileInputContainer />
        <TextareaContainer />
        <ButtonContainer />
      </form>
    </>
  );
}
