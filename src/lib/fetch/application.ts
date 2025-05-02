import instance from "../api/api";

// 지원하기
export const fetchApplications = async (formId: number) => {
  try {
    const response = await instance.post(`/forms/${formId}/applications`);
    if (!response.data) {
      throw new Error("지원하기 실패");
    }
    return response.data;
  } catch (error) {
    console.error("지원하기 중 에러 발생", error);
    throw error;
  }
};

// 지원 현황 목록 조회
export const fetchGetApplications = async (formId: number) => {
  try {
    const response = await instance.get(`/forms/${formId}/applications`);
    if (!response.data) {
      throw new Error("지원 현황 목록 조회 실패");
    }
    return response.data;
  } catch (error) {
    console.error("지원 현황 목록 조회 중 에러 발생", error);
    throw error;
  }
};

// 지원 상세 조회
export const fetchGetApplicationsById = async (applicationId: number) => {
  try {
    const response = await instance.get(`/applications/${applicationId}`);
    if (!response.data) {
      throw new Error("지원 상세 조회 실패");
    }
    return response.data;
  } catch (error) {
    console.error("지원 상세 조회 중 에러 발생", error);
    throw error;
  }
};

// 지원 상태 수정
export const fetchEditApplications = async (applicationId: number) => {
  try {
    const response = await instance.patch(`/applications/${applicationId}`);
    if (!response.data) {
      throw new Error("지원 상태 수정 실패");
    }
    return response.data;
  } catch (error) {
    console.error("지원 상태 수정 중 에러 발생", error);
    throw error;
  }
};

// 비회원의 내 지원 내역 조회
export const fetchUnverifiedApplication = async (formId: number) => {
  try {
    const response = await instance.post(
      `/forms/${formId}/my-application/verify`
    );
    if (!response.data) {
      throw new Error("비회원의 내 지원 내역 조회 실패");
    }
    return response.data;
  } catch (error) {
    console.error("비회원의 내 지원 내역 조회 중 에러 발생", error);
    throw error;
  }
};

// 회원의 내 지원 내역 조회
export const fetchVerifiedApplication = async (formId: number) => {
  try {
    const response = await instance.get(`/forms/${formId}/my-application`);
    if (!response.data) {
      throw new Error("회원의 내 지원 내역 조회 실패");
    }
    return response.data;
  } catch (error) {
    console.error("회원의 내 지원 내역 조회 중 에러 발생", error);
    throw error;
  }
};
