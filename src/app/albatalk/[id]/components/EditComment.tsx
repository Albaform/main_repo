import { EditCommentProps } from '../types';
import Image from 'next/image';
import { useEditCommentForm } from '../hooks/useEditCommentForm';

export default function EditComment({
  content,
  editingCommentId,
  setEditingCommentId,
}: EditCommentProps) {
  const { form, isPending, onSubmit } = useEditCommentForm({
    editingCommentId,
    setEditingCommentId,
  });
  const { handleSubmit, register, watch } = form;

  const watched = watch();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          id='editComment'
          {...register('editComment')}
          defaultValue={content}
          maxLength={500}
          className='w-full p-[14px] bg-background-200 rounded-[8px] font-light'
        />
        <div className='flex justify-self-end mt-[10px]'>
          <button
            onClick={() => setEditingCommentId(null)}
            className='h-[40px] border rounded-[8px] border-line-200 border-solid px-[20px] mr-[10px]'
          >
            취소
          </button>
          <button
            className='h-[40px] rounded-[8px] bg-orange-400 text-white min-w-[93px] text-center justify-items-center disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={
              isPending ||
              watched.editComment === '' ||
              watched.editComment === content
            }
          >
            {isPending ? (
              <Image
                src='/images/buttonLoader.gif'
                alt='Loading'
                width={25}
                height={10}
              />
            ) : (
              '수정하기'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
