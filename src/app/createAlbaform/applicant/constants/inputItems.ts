import { AlbaformApplyInput } from '@/schemas/albaformApplySchema';

type InputItem = {
  label: string;
  name: keyof AlbaformApplyInput;
  type: string;
  placeholder: string;
};

export const INPUT_ITEMS: InputItem[] = [
  {
    label: '이름',
    name: 'name',
    type: 'text',
    placeholder: '이름을 입력해주세요',
  },
  {
    label: '연락처',
    name: 'phoneNumber',
    type: 'tel',
    placeholder: '숫자만 입력해주세요',
  },
  {
    label: '경력(개월 수)',
    name: 'experienceMonths',
    type: 'number',
    placeholder: '숫자만 입력해주세요',
  },
];
