'use client';

import ListCard from "./ListCard";
import { useAlbaForms } from "@/hooks/query/useGetForms";
import Loader from "@/components/loader/Loader";
import Empty from "@/components/empty/Empty";

export default function AlbaList(){
    const { data, isLoading } = useAlbaForms(9);

    if (isLoading) return <Loader />;




    return (
        <div style={{ backgroundColor: 'var(--background100)', padding: '56px 220px' }}>
          {data?.data.length! > 0 ? (
           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data!.data.map((form: any, idx: number) => (
                <ListCard key={idx} form={form} />
              ))}
            </ul>
          ) : (
           <Empty/>
          )}
        </div>
      );
    }