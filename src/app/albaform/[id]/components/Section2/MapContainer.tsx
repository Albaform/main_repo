import StoreMap from '@/components/common/StoreMap';
import { Dispatch, SetStateAction, useRef } from 'react';

export default function MapContainer({
  setCopied,
  location,
}: {
  setCopied: Dispatch<SetStateAction<boolean>>;
  location: string;
}) {
  const addressRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (addressRef.current) {
      const text = addressRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <p className='text-3xl font-semibold'>근무 지역</p>
      <div className='text-[20px] mt-[24px] mb-[48px] flex items-center'>
        <p ref={addressRef}>{location}</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-orange-400 ml-3 text-[16px] font-semibold inline-block min-w-fit'
        >
          복사
        </button>
      </div>
      <div className='w-full'>
        <StoreMap address={location} />
      </div>
    </>
  );
}
