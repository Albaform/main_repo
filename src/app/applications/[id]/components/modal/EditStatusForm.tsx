import { useState } from 'react';
import { reverseStatusMap, statusMap } from '../../constants/StatusMappings';
import { useEditApplications } from '@/hooks/mutation/useEditApplications';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

export default function EditStatusForm({
  handleCloseModal,
  onSuccess,
  status,
  applicationId,
  formId,
}: {
  handleCloseModal: () => void;
  onSuccess: () => void;
  status: string;
  applicationId: number;
  formId: number;
}) {
  const queryClient = useQueryClient();

  const [isStatus, setIsStatus] = useState(
    statusMap[status as keyof typeof statusMap],
  );
  const StatusItems = Object.values(statusMap);

  const { mutate: editStatus, isPending: editStatusPending } =
    useEditApplications();

  const handleSubmit = () => {
    const apiStatus = reverseStatusMap[isStatus];

    editStatus(
      { applicationId, apiStatus },
      {
        onSuccess: () => {
          onSuccess();
          queryClient.invalidateQueries({ queryKey: ['applications', formId] });
        },
        onSettled: handleCloseModal,
      },
    );
  };

  return (
    <>
      {StatusItems.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex justify-between items-center h-[60px] px-6 border border-solid mb-2 rounded-[8px] cursor-pointer ${
              isStatus === item
                ? 'border-orange-300 text-orange-400'
                : 'border-line-100 text-black300'
            }`}
            onClick={() => setIsStatus(item)}
          >
            <p>{item}</p>
            <div
              className={`relative w-[22px] h-[22px] rounded-[50%] border border-solid ${
                isStatus === item ? 'border-orange-300' : 'border-gray-200'
              }`}
            >
              {isStatus === item && (
                <div className='absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-[50%] bg-orange-400' />
              )}
            </div>
          </div>
        );
      })}
      <div className='flex items-center gap-x-2 mt-[30px] text-white'>
        <button
          type='button'
          onClick={handleCloseModal}
          className='flex-[1] h-[60px] rounded-[8px] bg-gray-300 font-semibold text-[18px]'
        >
          취소
        </button>
        <button
          type='button'
          className='flex-[1] h-[60px] rounded-[8px] bg-orange-400 font-semibold text-[18px] text-center justify-items-center disabled:bg-gray-400 disabled:cursor-not-allowed'
          onClick={handleSubmit}
          disabled={editStatusPending}
        >
          {editStatusPending ? (
            <Image
              src='/images/buttonLoader.gif'
              alt='Loading'
              width={50}
              height={20}
            />
          ) : (
            '선택하기'
          )}
        </button>
      </div>
    </>
  );
}
