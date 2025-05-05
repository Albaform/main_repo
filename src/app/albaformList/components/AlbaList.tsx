'use client';

import ListCard from "./ListCard";
import { useAlbaForms } from "@/hooks/query/useGetForms";
import Loader from "@/components/loader/Loader";
import Empty from "@/components/empty/Empty";

export default function AlbaList(){
    const { data, isLoading } = useAlbaForms(9);

    if (isLoading) return <Loader />;


    return (
        <div style={{ backgroundColor: 'var(--background100)' }}>
          {data?.data.length! > 0 ? (
            <ul className="flex flex-col gap-4">
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