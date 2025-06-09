// 게시글 수정하기

import { fetchEditPosts } from "@/lib/fetch/post";
import { useMutation } from "@tanstack/react-query";

// PATCH '/posts/:postId'
export const useEditPosts = () => {
  return useMutation({
    mutationFn: fetchEditPosts,
  });
};
