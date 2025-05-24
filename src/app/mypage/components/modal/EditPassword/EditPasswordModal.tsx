import Image from 'next/image';
import useFormChangeDetector from '@/app/mypage/hooks/usePasswordChangeDetector';
import { ScrollHiddenDiv } from '@/app/mypage/styles';
import { EditModalProps } from '@/app/mypage/types';
import Overlay from '@/components/modal/Overlay';
import EditPasswordForm from './EditPasswordForm';
import { useEditPasswordForm } from '@/app/mypage/hooks/useEditPasswordForm';

export default function EditPasswordModal({
  showModal,
  setShowModal,
  handleCloseModal,
  onSuccess,
}: EditModalProps) {
  const formLogic = useEditPasswordForm({ setShowModal, onSuccess });

  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] text-black-400 max-h-[calc(100vh_*_(1090/1256))] overflow-y-scroll scrollbar-hide pb-[20px]'>
        <p className='text-[24px] mb-[48px] font-medium max-[768px]:text-[18px]'>
          비밀번호 변경
        </p>
        <EditPasswordForm {...formLogic} handleCloseModal={handleCloseModal} />
        {formLogic.isPending && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Image
              src='/images/loader.gif'
              alt='Loading...'
              width={80}
              height={80}
            />
          </div>
        )}
      </ScrollHiddenDiv>
    </Overlay>
  );
}
