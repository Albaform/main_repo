import { EditUserInput } from '@/schemas/editProfileSchema';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import Image from 'next/image';
import { Control, Controller } from 'react-hook-form';

export default function Address({
  editInfoControl,
  disabled,
}: {
  editInfoControl?: Control<EditUserInput>;
  disabled: boolean;
}) {
  return (
    <Controller
      name='address'
      control={editInfoControl && editInfoControl}
      render={({ field }) => (
        <div
          className={`flex items-center w-full px-[7px] py-[8px] border border-gray-200 border-solid rounded-[8px] text-left cursor-pointer ${
            disabled && 'bg-[#fafafa]'
          }`}
          onClick={() =>
            openKakaoAddress(async (addr) => {
              field.onChange(addr);
            })
          }
        >
          <Image
            src='/images/mypage/iconLocation.svg'
            alt='주소:'
            width={36}
            height={36}
            className='mt-[.5px]'
          />
          <p
            className={`${!field.value && 'text-gray-400'} whitespace-pre-wrap`}
          >
            {field.value || '가게 위치를 설정해주세요'}
          </p>
        </div>
      )}
    />
  );
}
