import React from 'react';
import { useRouter } from 'next/navigation';
import FileInputContainer from './FileInputContainer';
import TextareaContainer from './TextareaContainer';
import TextInputcontainer from './TextInputContainer';
import ButtonContainer from './ButtonContainer';
import { INPUT_ITEMS } from '../constants/inputItems';
import { useApplyForm } from '../hooks/useApplyForm';

export default function FormContainer({ formId }: { formId: number }) {
  const router = useRouter();

  const formLogic = useApplyForm(formId);
  const { form, onSubmit, isPending } = formLogic;
  const { handleSubmit } = form;

  return (
    <>
      <div className='flex items-center justify-between my-10'>
        <p className='text-[26px] font-semibold'>알바폼 지원하기</p>
        <button
          type='button'
          onClick={() => {
            router.back();
          }}
          className='h-12 rounded-[8px] bg-gray-300 text-white px-6'
        >
          작성 취소
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isPending}
          className={`${isPending ? 'pointer-events-none' : ''}`}
        >
          {INPUT_ITEMS.map(({ label, name, type, placeholder }, i) => {
            return (
              <React.Fragment key={i}>
                <TextInputcontainer
                  label={label}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  formLogic={formLogic}
                />
              </React.Fragment>
            );
          })}
          <FileInputContainer {...formLogic} />
          <TextareaContainer {...formLogic} />
          <ButtonContainer {...formLogic} />
        </fieldset>
      </form>
    </>
  );
}
