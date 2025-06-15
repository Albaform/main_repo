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
      await queryClient.cancelQueries({ queryKey: ['albaforms', formId] });

      const previousData = queryClient.getQueryData(['albaforms', formId]);

      queryClient.setQueryData<DetailFormDataProps>(
        ['albaforms', formId],
        (oldData) => {
          if (!oldData) return oldData;

          const isScrappedNow = oldData.isScrapped;

          return {
            ...oldData,
            isScrapped: !isScrappedNow,
          };
        },
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['albaforms', variables.formId],
          context.previousData,
        );
      }
    },
    onSettled: (data, error, varialbes) => {
      queryClient.invalidateQueries({
        queryKey: ['albaforms', varialbes.formId],
      });
    },
  });
};
