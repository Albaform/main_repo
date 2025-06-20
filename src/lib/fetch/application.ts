import instance from '../api/api';
import { AlbaformApplyPayload } from '@/app/createAlbaform/types';

// 지원하기
export const fetchApplications = async ({
  formId,
  payload,
}: {
  formId: number;
  payload: AlbaformApplyPayload;
}) => {
  try {
    console.log(payload);
    const response = await instance.post(
      `/forms/${formId}/applications`,
      payload,
    );
    if (!response.data) {
      throw new Error('지원하기 실패');
    }
    return response.data;
  } catch (error) {
    console.error('지원하기 중 에러 발생', error);
    throw error;
  }
};

// 지원 현황 목록 조회
export const fetchGetApplications = async (params: {
  formId: number;
  orderByExperience: 'asc' | 'desc';
  orderByStatus: 'asc' | 'desc';
  cursor?: number;
}) => {
  const { formId, orderByExperience, orderByStatus, cursor } = params;

  try {
    const requestUrl =
      cursor === 1
        ? `/forms/${formId}/applications?&limit=6&orderByExperience=${orderByExperience}&orderByStatus=${orderByStatus}`
        : `/forms/${formId}/applications?&limit=6&orderByExperience=${orderByExperience}&orderByStatus=${orderByStatus}&cursor=${cursor}`;

    const response = await instance.get(requestUrl);

    if (!response.data) {
      throw new Error('지원 현황 목록 조회 실패');
    }

    return {
      result: response.data.data,
      nextCursor: response.data.nextCursor,
    };
  } catch (error) {
    console.error('지원 현황 목록 조회 중 에러 발생', error);
    throw error;
  }
};

// 지원 상세 조회
export const fetchGetApplicationsById = async (applicationId: number) => {
  try {
    const response = await instance.get(`/applications/${applicationId}`);
    if (!response.data) {
      throw new Error('지원 상세 조회 실패');
    }
    return response.data;
  } catch (error) {
    console.error('지원 상세 조회 중 에러 발생', error);
    throw error;
  }
};

// 지원 상태 수정
export const fetchEditApplications = async ({
  applicationId,
  apiStatus,
}: {
  applicationId: number;
  apiStatus: string;
}) => {
  try {
    await instance.patch(`/applications/${applicationId}`, {
      status: apiStatus,
    });
  } catch (error) {
    console.error('지원 상태 수정 중 에러 발생', error);
    throw error;
  }
};

// 비회원의 내 지원 내역 조회
export const fetchUnverifiedApplication = async (formId: number) => {
  try {
    const response = await instance.post(
      `/forms/${formId}/my-application/verify`,
    );
    if (!response.data) {
      throw new Error('비회원의 내 지원 내역 조회 실패');
    }
    return response.data;
  } catch (error) {
    console.error('비회원의 내 지원 내역 조회 중 에러 발생', error);
    throw error;
  }
};

// 회원의 내 지원 내역 조회
export const fetchVerifiedApplication = async (formId: number) => {
  try {
    const response = await instance.get(`/forms/${formId}/my-application`);
    if (!response.data) {
      throw new Error('회원의 내 지원 내역 조회 실패');
    }
    return response.data;
  } catch (error) {
    console.error('회원의 내 지원 내역 조회 중 에러 발생', error);
    throw error;
  }
};
