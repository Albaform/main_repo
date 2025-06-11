// 댓글삭제

import { fetchDeleteComments } from "@/lib/fetch/comment";
import { useMutation } from "@tanstack/react-query";

// DELETE 'comments/:commentId'
export const useDeleteComments = () => {
  return useMutation({
    mutationFn: fetchDeleteComments,
  });
};
