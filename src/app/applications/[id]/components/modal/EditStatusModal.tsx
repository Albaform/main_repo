import { ScrollHiddenDiv } from '@/app/mypage/styles';
import Overlay from '@/components/modal/Overlay';
import EditStatusForm from './EditStatusForm';
import { EditModalProps } from '../../types';

export default function EditStatusModal({
  showModal,
  setShowModal,
  handleCloseModal,
  onSuccess,
  status,
  applicationId,
  formId
}: EditModalProps) {
  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] text-black-400 max-h-[calc(100vh_*_(1090/1256))] overflow-y-scroll scrollbar-hide pb-[20px]'>
        <p className='text-[24px] mb-[16px] font-medium max-md:text-[18px]'>
          진행상태 선택
        </p>
        <p className='mb-[48px] font-light text-gray-400'>
          현재 진행상태를 알려주세요.
        </p>
        <EditStatusForm
          handleCloseModal={handleCloseModal}
          onSuccess={onSuccess}
          status={status}
          applicationId={applicationId}
          formId={formId}
        />
      </ScrollHiddenDiv>
    </Overlay>
  );
}
