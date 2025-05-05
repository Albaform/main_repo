import { IoCloseOutline } from 'react-icons/io5';

type closeButtonProps = {
  className?: string;
  onClose: () => void;
};

export default function CloseButton({ onClose, className }: closeButtonProps) {
  return (
    <button className='flex rounded-full p-1' onClick={() => onClose()}>
      <IoCloseOutline className={`text-gray400 ${className}`} size={24} />
    </button>
  );
}
