'use client';

import { useGetApplicationsById } from '@/hooks/query/useGetApplicationsById';
import { useGetFormsById } from '@/hooks/query/useGetFormsById';
import { useParams, useSearchParams } from 'next/navigation';
import Section1 from './components/section1/Section1';
import Section2 from './components/section2/Section2';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import Loader from '@/components/loader/Loader';
import { DetailResponsive } from './styles';

export default function ApplicationDetail() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('formId');
  const formId = Number(searchParam);
  const params = useParams();
  const paramsId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
  const applicationId = Number(paramsId);

  const { data: form, isLoading: getFormLoading } = useGetFormsById(formId);
  const { data: application, isLoading: getApplicationLoading } =
    useGetApplicationsById(formId, applicationId);

  const { status } = application ?? {};

  const isLoading = getFormLoading || getApplicationLoading;

  return (
    <>
      {isLoading && <Loader />}
      <DetailResponsive>
        <Section1 formData={form} userStatus={status} />
      </DetailResponsive>
      <div className='h-3 bg-line-100' />
      <DetailResponsive>
        <Section2 applicationData={application} />
      </DetailResponsive>
    </>
  );
}
