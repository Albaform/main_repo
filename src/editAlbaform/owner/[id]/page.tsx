import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from '@/app/createAlbaform/owner/page';
import {
  useEditAlbaForm,
  getAlbaFormById,
} from '@/hooks/mutation/useEditForms';

export default function EditAlbaformPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // 1. 기존 데이터 받아오기
    getAlbaFormById(id).then(setInitialData);
  }, [id]);

  if (!initialData) return <div>로딩중...</div>;

  return (
    <CreateForm
      initialData={initialData}
      isEdit
      onSubmit={async (data: any) => {
        await useEditAlbaForm(id, data);
        router.push(`/albaform/${id}`);
      }}
    />
  );
}
