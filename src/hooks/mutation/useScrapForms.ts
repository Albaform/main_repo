// 알바폼 스크랩

import { DetailFormDataProps } from '@/app/albaform/[id]/types';
import { fetchCancelScrapForms, fetchScrapForms } from '@/lib/fetch/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// POST '/forms/:formId/scrap'
export const useScrapForms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formId,
      isScrapped,
    }: {
      formId: number;
      isScrapped: boolean;
    }) => {
      return isScrapped
        ? fetchCancelScrapForms(formId)
        : fetchScrapForms(formId);
    },
    onMutate: async ({ formId, isScrapped }) => {
      await queryClient.cancelQueries({ queryKey: ['albaform', formId] });
      await queryClient.cancelQueries({ queryKey: ['myScrap'] });

      const previousData = queryClient.getQueryData(['albaform', formId]);
      const previousMyScrap = queryClient.getQueryData(['myScrap']);

      queryClient.setQueryData<DetailFormDataProps>(
        ['albaform', formId],
        (oldData) => {
          if (!oldData) return oldData;

          const isScrappedNow = oldData.isScrapped;

          return {
            ...oldData,
            isScrapped: !isScrappedNow,
          };
        },
      );

      return { previousData, previousMyScrap };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['albaform', variables.formId],
          context.previousData,
        );
      }
      if (context?.previousMyScrap) {
        queryClient.setQueryData(['myScrap'], context.previousMyScrap);
      }
    },
    onSettled: (data, error, varialbes) => {
      queryClient.invalidateQueries({
        queryKey: ['albaform', varialbes.formId],
      });
      queryClient.invalidateQueries({ queryKey: ['myScrap'] });
    },
  });
};
