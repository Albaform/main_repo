import { RestoreModalProps } from '../../types';

export default function RestoreModal({
  onConfirm,
  onCancel,
}: RestoreModalProps) {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-[1000]'
      style={{ background: 'rgba(0,0,0,.5)' }}
    >
      <div className='bg-white p-6 rounded-xl shadow-lg text-center max-w-[350px] w-full mx-6'>
        <p className='mb-6 text-[18px] font-medium'>
          임시 저장된 내용이 있습니다.
          <br />
          복구하시겠어요?
          <span className='block pt-2 pb-3 text-[14px] text-gray-400 font-light'>
            복구하지 않으면 임시 저장된 내용이 삭제 됩니다.
          </span>
        </p>
        <div className='flex justify-center gap-4'>
          <button
            className='px-8 py-2 rounded bg-orange-400 text-white min-w-[110px] box-border'
            onClick={onConfirm}
          >
            복구
          </button>
          <button
            className='px-8 py-2 rounded border border-solid border-gray-200 text-gray-400 min-w-[110px] box-border'
            onClick={onCancel}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
