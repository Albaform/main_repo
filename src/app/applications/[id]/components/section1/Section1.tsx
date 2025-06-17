import { DetailFormDataProps } from '@/app/albaform/[id]/types';
import MapContainer from './MapContainer';
import DetailContainer from './DetailContainer';
import StatusContainer from './StatusContainer';
import { Dispatch, SetStateAction } from 'react';

export default function Section1({
  formData,
  userStatus,
  role,
  setShowModal,
}: {
  formData: DetailFormDataProps;
  userStatus: string;
  role: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <MapContainer location={formData?.location} />
      <div className='flex mt-[80px] max-lg:flex-row w-full gap-x-[150px] gap-y-[80px] max-[1480px]:gap-x-[50px] max-lg:flex-col max-lg:gap-[0] max-md:mt-[40px] max-xs:mt-[32px]'>
        <div className='flex-[1] w-full'>
          <DetailContainer form={formData} />
        </div>
        <div className='flex-[1] w-full'>
          <StatusContainer
            form={formData}
            userStatus={userStatus}
            role={role}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </>
  );
}
