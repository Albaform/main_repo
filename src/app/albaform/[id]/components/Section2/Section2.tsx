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
  setShowModal,
  setMainMessage,
  setSubMessage,
  setModalType,
}: {
  form: DetailFormDataProps;
  setCopied: Dispatch<SetStateAction<boolean>>;
  role: 'OWNER' | 'APPLICANT';
  isLoading: boolean;
  myPost: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<string>>;
  setSubMessage: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<
    SetStateAction<
      | 'editUser'
      | 'editPassword'
      | 'deletePost'
      | 'deleteComment'
      | 'cancelScrap'
      | 'deleteForms'
    >
  >;
}) {
  const { description, location } = form ?? {};
  return (
    <div className='flex max-lg:flex-row w-full gap-x-[150px] gap-y-[80px] max-[1480px]:gap-x-[50px] items-center max-lg:flex-col max-lg:gap-[0] max-lg:items-start'>
      <div className='flex-[1] w-full'>
        <TextContainer content={description} />
        <MapContainer setCopied={setCopied} location={location} />
      </div>
      <div className='flex-[1] max-lg:w-full max-lg:mt-20'>
        <BlockContainer
          role={role}
          isLoading={isLoading}
          myPost={myPost}
          form={form}
          setShowModal={setShowModal}
          setMainMessage={setMainMessage}
          setSubMessage={setSubMessage}
          setModalType={setModalType}
        />
      </div>
    </div>
  );
}
