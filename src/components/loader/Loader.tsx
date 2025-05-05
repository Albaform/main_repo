import Image from 'next/image';
import { LoaderContainer, LoadingBackground } from './Loader.styles';

export default function Loader() {
  return (
    <LoadingBackground>
      <LoaderContainer>
        <Image
          src='/images/loader.gif'
          alt='Loading...'
          width={130}
          height={130}
        />
      </LoaderContainer>
    </LoadingBackground>
  );
}
