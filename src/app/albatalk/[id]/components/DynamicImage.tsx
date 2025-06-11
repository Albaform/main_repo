import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DynamicImage({
  src,
}: {
  src: string;
}) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [src]);

  if (!size) return null;

  return (
    <>
      <div className='relative w-full'>
        <Image
          src={src}
          alt='기본이미지'
          layout='responsive'
          width={size?.width}
          height={size?.height}
          className='object-cover'
        />
      </div>
    </>
  );
}
