import instance from "../api/api";

// 이미지 업로드
export const fetchUploadImage = async () => {
  try {
    const response = await instance.post("/upload");
    if (!response.data) {
      throw new Error("이미지 업로드 실패");
    }
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 중 에러 발생", error);
    throw error;
  }
};

// 이력서 업로드
export const fetchUploadResume = async () => {
  try {
    const response = await instance.post("/resume/upload");
    if (!response.data) {
      throw new Error("이력서 업로드 실패");
    }
    return response.data;
  } catch (error) {
    console.error("이력서 업로드 중 에러 발생", error);
    throw error;
  }
};

// 이력서 다운로드
export const fetchDownloadResume = async () => {
  try {
    const response = await instance.get("/:resumeId/download");
    if (!response.data) {
      throw new Error("이력서 다운로드 실패");
    }
    return response.data;
  } catch (error) {
    console.error("이력서 다운로드 중 에러 발생", error);
    throw error;
  }
};
