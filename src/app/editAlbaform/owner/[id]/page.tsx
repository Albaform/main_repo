'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from '@/app/createAlbaform/components/CreateForm';

import {
  useEditAlbaForm,
  getAlbaFormById,
} from '@/hooks/mutation/useEditForms';
import { InfoFormValues } from '@/app/createAlbaform/components/FormInfo';
import { ConditionFormValues } from '@/app/createAlbaform/components/FormCondition';
import { WorkFormValues } from '@/app/createAlbaform/components/FormWork';

type AlbaFormInitialData = {
  info: InfoFormValues;
  condition: ConditionFormValues;
  work: WorkFormValues;
} | null;

export default function editAlbaform({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const [initialData, setInitialData] = useState<AlbaFormInitialData>(null);

  const editAlbaFormMutation = useEditAlbaForm(id, () => {
    router.push(`/albaform/${id}`);
  });

  useEffect(() => {
    getAlbaFormById(id).then((data) => {
      setInitialData({
        info: {
          title: data.title,
          description: data.description,
          recruitmentStartDate: data.recruitmentStartDate,
          recruitmentEndDate: data.recruitmentEndDate,
          imageUrls: data.imageUrls || [],
        },
        condition: {
          numberOfPositions: data.numberOfPositions,
          gender: data.gender,
          education: data.education,
          age: data.age,
          preferred: data.preferred,
        },
        work: {
          location: data.location,
          workStartDate: data.workStartDate,
          workEndDate: data.workEndDate,
          workStartTime: data.workStartTime,
          workEndTime: data.workEndTime,
          workDays: data.workDays || [],
          isNegotiableWorkDays: data.isNegotiableWorkDays,
          hourlyWage: data.hourlyWage,
          isPublic: data.isPublic,
        },
      });
    });
  }, [id]);

  if (!initialData) return <div>로딩중...</div>;

  return (
    <CreateForm
      initialData={initialData}
      isEdit={true}
      onSubmit={(data) => {
        editAlbaFormMutation.mutate(data);
      }}
    />
  );
}

