import instance from "../api/api";

// 댓글 작성
export const fetchPostComments = async (postId: number) => {
  try {
    const response = await instance.post(`/posts/${postId}/comments`);
    if (!response.data) {
      throw new Error("댓글 작성 실패");
    }
    return response.data;
  } catch (error) {
    console.error("댓글 작성 중 에러 발생", error);
    throw error;
  }
};

// 댓글 목록 조회
export const fetchGetComments = async (postId: number) => {
  try {
    const response = await instance.get(`/posts/${postId}/comments`);
    if (!response.data) {
      throw new Error("댓글 목록 조회 실패");
    }
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 중 에러 발생", error);
    throw error;
  }
};

// 댓글 수정
export const fetchEditComments = async (commnetId: number) => {
  try {
    const response = await instance.patch(`/comments/${commnetId}`);
    if (!response.data) {
      throw new Error("댓글 수정 실패");
    }
    return response.data;
  } catch (error) {
    console.error("댓글 수정 중 에러 발생", error);
    throw error;
  }
};

// 댓글 삭제
export const fetchDeleteComments = async (commentId: number) => {
  try {
    const response = await instance.delete(`/comments/${commentId}`);
    if (!response.data) {
      throw new Error("댓글 삭제 실패");
    }
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 중 에러 발생", error);
    throw error;
  }
};
