// 게시글 좋아요

import { PostData } from '@/app/albatalk/[id]/types';
import { fetchDeleteLikePosts, fetchPostLikePosts } from '@/lib/fetch/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// POST '/posts/:postId/like'
export const useLikePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      isLiked,
    }: {
      postId: number;
      isLiked: boolean;
    }) => {
      if (isLiked) {
        return fetchDeleteLikePosts(postId);
      } else {
        return fetchPostLikePosts(postId);
      }
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });

      const previousPost = queryClient.getQueryData(['post', postId]);

      queryClient.setQueryData<PostData>(['post', postId], (oldData) => {
        if (!oldData) return oldData;

        const isLikedNow = oldData.isLiked;
        const likeCount = oldData.likeCount;

        return {
          ...oldData,
          isLiked: !isLikedNow,
          likeCount: isLikedNow ? likeCount - 1 : likeCount + 1,
        };
      });

      return { previousPost };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ['post', variables.postId],
          context.previousPost,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
    },
  });
};
