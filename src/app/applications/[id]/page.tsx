'use client';

import { useGetApplicationsById } from '@/hooks/query/useGetApplicationsById';
import { useGetFormsById } from '@/hooks/query/useGetFormsById';
import { useParams, useSearchParams } from 'next/navigation';
import Section1 from './components/section1/Section1';
import Section2 from './components/section2/Section2';
import Loader from '@/components/loader/Loader';
import { DetailResponsive } from './styles';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import { useModalController } from '@/hooks/common/useModalController';
import EditStatusModal from './components/modal/EditStatusModal';
import { useState } from 'react';
import Toast from '@/components/tooltip/Toast';

export default function ApplicationDetail() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('formId');
  const formId = Number(searchParam);
  const params = useParams();
  const paramsId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
  const applicationId = Number(paramsId);

  const [showToast, setShowToast] = useState(false);

  const { showModal, setShowModal } = useModalController();

  const { data: form, isLoading: getFormLoading } = useGetFormsById(formId);
  const { data: application, isLoading: getApplicationLoading } =
    useGetApplicationsById(formId, applicationId);
  const { data: user, isLoading: getUserLoading } = useGetMyInfo();

  const { status, resumeId, resumeName } = application ?? {};
  const { role } = user ?? {};

  const isLoading = getFormLoading || getApplicationLoading || getUserLoading;

  const handleShowToast = () => {
    setShowToast(true);
  };

  return (
    <>
      {showModal && (
        <EditStatusModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleCloseModal={() => setShowModal(false)}
          onSuccess={handleShowToast}
          status={status}
          applicationId={applicationId}
          formId={formId}
        />
      )}
      {isLoading && <Loader />}
      <DetailResponsive>
        <Section1
          formData={form}
          userStatus={status}
          role={role}
          setShowModal={setShowModal}
        />
      </DetailResponsive>
      <div className='h-3 bg-line-100' />
      <DetailResponsive>
        <Section2
          applicationData={application}
          resumeId={resumeId}
          resumeName={resumeName}
        />
      </DetailResponsive>
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          상태 변경이 완료 되었습니다!
        </Toast>
      )}
    </>
  );
}
