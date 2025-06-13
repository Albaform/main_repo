import { fetchAlbaForms } from '@/lib/fetch/form';
import ClientAlbaform from './ClientAlbaform';
import { getItemsPerPage } from './utils/getItemsPerPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function AlbaForm() {
  const itemsPerPage = getItemsPerPage();
  const queryClient = new QueryClient();

  const initialParams = {
    postSort: 'mostRecent' as const,
    recruitingSort: true,
    keyword: '',
    itemsPerPage,
    cursor: 1,
  };

  await queryClient.prefetchQuery({
    queryKey: ['albaforms', initialParams],
    queryFn: () => fetchAlbaForms(initialParams),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientAlbaform initialParams={initialParams} />
      </HydrationBoundary>
    </>
  );
}
