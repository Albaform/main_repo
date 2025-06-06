import React from 'react';

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='max-xs:pb-[calc(137px+theme(spacing.safe-bottom))]'>
      <form>{children}</form>
    </div>
  );
}
