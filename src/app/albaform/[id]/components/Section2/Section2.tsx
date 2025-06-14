import { Dispatch, SetStateAction } from 'react';
import BlockContainer from './BlockContainer';
import MapContainer from './MapContainer';
import TextContainer from './TextContainer';

export default function Section2({
  setCopied,
}: {
  setCopied: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className='flex max-lg:flex-row w-full gap-x-[150px] gap-y-[80px] max-[1480px]:gap-x-[50px] items-center max-lg:flex-col max-lg:gap-[0] max-lg:items-start'>
      <div className='flex-[1]'>
        <TextContainer />
        <MapContainer setCopied={setCopied} />
      </div>
      <div className='flex-[1] max-lg:w-full max-lg:mt-20'>
        <BlockContainer />
      </div>
    </div>
  );
}
