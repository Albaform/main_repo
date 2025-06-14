import { Dispatch, SetStateAction } from 'react';
import BlockContainer from './BlockContainer';
import MapContainer from './MapContainer';
import TextContainer from './TextContainer';
import { DetailFormDataProps } from '../../types';

export default function Section2({
  form,
  setCopied,
  role,
  isLoading,
  myPost,
}: {
  form: DetailFormDataProps;
  setCopied: Dispatch<SetStateAction<boolean>>;
  role: 'OWNER' | 'APPLICANT';
  isLoading: boolean;
  myPost: boolean;
}) {
  const { description, location } = form ?? {};
  return (
    <div className='flex max-lg:flex-row w-full gap-x-[150px] gap-y-[80px] max-[1480px]:gap-x-[50px] items-center max-lg:flex-col max-lg:gap-[0] max-lg:items-start'>
      <div className='flex-[1] w-full'>
        <TextContainer content={description} />
        <MapContainer setCopied={setCopied} location={location} />
      </div>
      <div className='flex-[1] max-lg:w-full max-lg:mt-20'>
        <BlockContainer role={role} isLoading={isLoading} myPost={myPost} form={form}/>
      </div>
    </div>
  );
}
