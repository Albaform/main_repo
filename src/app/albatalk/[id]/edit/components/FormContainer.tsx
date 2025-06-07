import { AlbatalkInput } from '@/schemas/albatalkSchema';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function FormContainer({
  form,
  isPending,
  onSubmit,
  children,
}: {
  form: UseFormReturn<AlbatalkInput>;
  isPending: boolean;
  onSubmit: (formData: AlbatalkInput) => void;
  children: React.ReactNode;
}) {
  const { handleSubmit } = form;

  return (
    <div className='max-xs:pb-[calc(137px+theme(spacing.safe-bottom))]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isPending}
          className={`${isPending ? 'pointer-events-none' : ''}`}
        >
          {children}
        </fieldset>
      </form>
    </div>
  );
}
