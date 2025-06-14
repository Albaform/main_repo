import { DetailFormDataProps } from '../../types';
import BlockContainer from './BlockContainer';
import TextContainer from './TextContainer';

export default function Section1({ form }: { form: DetailFormDataProps }) {
  return (
    <div className='flex gap-x-[150px] gap-y-[80px] max-lg:flex-col max-lg:gap-x-[0] max-lg:gap-y-[0] max-[1480px]:gap-x-[50px]'>
      <TextContainer form={form} />
      <BlockContainer form={form} />
    </div>
  );
}
