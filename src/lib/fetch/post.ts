import instance from "../api/api";

// 게시글 등록
export const fetchPostPosts = async () => {
  try {
    const response = await instance.post("/posts");
    if (!response.data) {
      throw new Error("게시물 데이터 불러오기 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 데이터 불러오는 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 목록 조회
export const fetchGetPosts = async () => {
  try {
    const response = await instance.get("/posts");
    if (!response.data) {
      throw new Error("게시물 데이터 불러오기 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 데이터 불러오는 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchGetPostsById = async (postId: number) => {
  try {
    const response = await instance.get(`/posts/${postId}`);
    if (!response.data) {
      throw new Error("게시물 데이터 불러오기 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 데이터 불러오는 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 수정
export const fetchEditPosts = async (postId: number) => {
  try {
    const response = await instance.patch(`/posts/${postId}`);
    if (!response.data) {
      throw new Error("게시물 데이터 수정 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 데이터 수정 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 삭제
export const fetchDeletePosts = async (postId: number) => {
  try {
    const response = await instance.delete(`/posts/${postId}`);
    if (!response.data) {
      throw new Error("게시물 데이터 삭제 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 데이터 삭제 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 좋아요
export const fetchLikePosts = async (postId: number) => {
  try {
    const response = await instance.post(`/posts/${postId}/like`);
    if (!response.data) {
      throw new Error("게시물 좋아요 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 좋아요 중 에러 발생:", error);
    throw error;
  }
};

// 게시글 좋아요 취소
export const fetchDeleteLikePosts = async (postId: number) => {
  try {
    const response = await instance.delete(`/posts/${postId}/like`);
    if (!response.data) {
      throw new Error("게시물 좋아요 취소 실패");
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error("게시물 좋아요 취소 중 에러 발생:", error);
    throw error;
  }
};
