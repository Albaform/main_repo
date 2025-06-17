import { ScrollHiddenDiv } from '@/app/mypage/styles';
import Overlay from '@/components/modal/Overlay';
import { EditModalProps } from '@/app/mypage/types';
import EditStatusForm from './EditStatusForm';

export default function EditStatusModal({
  showModal,
  setShowModal,
  handleCloseModal,
  onSuccess,
}: EditModalProps) {
  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] text-black-400 max-h-[calc(100vh_*_(1090/1256))] overflow-y-scroll scrollbar-hide pb-[20px]'>
        <p className='text-[24px] mb-[48px] font-medium max-md:text-[18px]'>
          진행상태 선택
        </p>
        <EditStatusForm handleCloseModal={handleCloseModal} />
      </ScrollHiddenDiv>
    </Overlay>
  );
}
