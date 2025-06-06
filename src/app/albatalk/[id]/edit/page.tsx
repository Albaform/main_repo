'use client';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import HeadContainer from './components/HeadContainer';
import FormContainer from './components/FormContainer';
import PostFormInputs from './components/PostFormInputs';

export default function EditAlbatalk() {
  return (
    <>
      <ResponsiveStyle>
        <FormContainer>
          <HeadContainer />
          <PostFormInputs />
        </FormContainer>
      </ResponsiveStyle>
    </>
  );
}
