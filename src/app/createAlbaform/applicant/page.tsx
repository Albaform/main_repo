'use client';

import FormContainer from './components/FormContainer';
import { ApplyFormResponsive } from '../styles';
import { useSearchParams } from 'next/navigation';

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('formId');
  const formId = Number(searchParam);

  return (
    <ApplyFormResponsive>
      <FormContainer formId={formId} />
    </ApplyFormResponsive>
  );
}
