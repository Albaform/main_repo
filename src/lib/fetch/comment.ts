import instance from '../api/api';

// 댓글 작성
export const fetchPostComments = async ({
  postId,
  createComment: content,
}: {
  postId: number;
  createComment: string;
}) => {
  try {
    const response = await instance.post(`/posts/${postId}/comments`, {
      content,
    });
    if (!response.data) {
      throw new Error('댓글 작성 실패');
    }

    return response.data.data;
  } catch (error) {
    console.error('댓글 작성 중 에러 발생', error);
    throw error;
  }
};

// 댓글 목록 조회
export const fetchGetComments = async ({
  page,
  postId,
}: {
  page: number;
  postId: number;
}) => {
  try {
    const response = await instance.get(
      `/posts/${postId}/comments?page=${page}&pageSize=6`,
    );
    if (!response.data) {
      throw new Error('댓글 목록 조회 실패');
    }

    return {
      result: response.data.data,
      totalPages: response.data.totalPages,
      totalCommentCount: response.data.totalItemCount,
    };
  } catch (error) {
    console.error('댓글 목록 조회 중 에러 발생', error);
    throw error;
  }
};

// 댓글 수정
export const fetchEditComments = async ({
  commentId,
  editComment: content,
}: {
  commentId: number;
  editComment: string;
}) => {
  try {
    const response = await instance.patch(`/comments/${commentId}`, {
      content,
    });
    if (!response.data) {
      throw new Error('댓글 수정 실패');
    }

    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 에러 발생', error);
    throw error;
  }
};

// 댓글 삭제
export const fetchDeleteComments = async (commentId: number) => {
  try {
    await instance.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제 중 에러 발생', error);
    throw error;
  }
};
