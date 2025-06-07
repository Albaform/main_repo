'use client';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import HeadContainer from './components/HeadContainer';
import FormContainer from './components/FormContainer';
import PostFormInputs from './components/PostFormInputs';
import { useEditForm } from './hooks/useEditForm';
import Image from 'next/image';

export default function NewAlbatalk() {
  const formLogic =  useEditForm();

  return (
    <>
      <ResponsiveStyle>
        <FormContainer {...formLogic}>
          <HeadContainer {...formLogic} />
          <PostFormInputs {...formLogic} />
        </FormContainer>
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
      </ResponsiveStyle>
    </>
  );
}
