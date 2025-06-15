import instance from '../api/api';
import { FormListResponse } from '@/app/albaform/types';

// 알바폼 생성
export const fetchPostForms = async () => {
  try {
    const response = await instance.post('/forms');
    if (!response.data) {
      throw new Error('알바폼 생성 실패');
    }
    return response.data;
  } catch (error) {
    console.error('알바 폼 생성 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 목록 조회
export const fetchAlbaForms = async (params: {
  postSort: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  recruitingSort: boolean;
  keyword: string;
  itemsPerPage: number;
  cursor?: number;
}) => {
  const { postSort, recruitingSort, keyword, itemsPerPage, cursor } = params;

  try {
    const requestUrl =
      cursor === 1
        ? `/forms?orderBy=${postSort}&limit=${itemsPerPage}&keyword=${keyword}&isRecruiting=${recruitingSort}`
        : `/forms?orderBy=${postSort}&limit=${itemsPerPage}&keyword=${keyword}&isRecruiting=${recruitingSort}&cursor=${cursor}`;

    const res = await instance.get(requestUrl);
    if (!res.data) {
      throw new Error('알바폼 목록 조회 실패');
    }
    return {
      result: res.data.data,
      nextCursor: res.data.nextCursor,
    };
  } catch (error) {
    console.error('알바 폼 목록 조회 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 수정
export const fetchEditForms = async (formId: number) => {
  try {
    const response = await instance.patch(`/forms/${formId}`);
    if (!response.data) {
      throw new Error('알바폼 수정 실패');
    }
    return response.data;
  } catch (error) {
    console.error('알바 폼 수정 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 삭제
export const fetchDeleteForms = async (formId: number) => {
  try {
    await instance.delete(`/forms/${formId}`);
  } catch (error) {
    console.error('알바 폼 삭제 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 상세 조회
export const fetchGetFormsById = async (formId: number) => {
  try {
    const response = await instance.get(`/forms/${formId}`);
    if (!response.data) {
      throw new Error('알바폼 상세 조회 실패');
    }
    return response.data;
  } catch (error) {
    console.error('알바 폼 상세 조회 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 스크랩
export const fetchScrapForms = async (formId: number) => {
  try {
    const response = await instance.post(`/forms/${formId}/scrap`);
    if (!response.data) {
      throw new Error('알바폼 스크랩 실패');
    }
  } catch (error) {
    console.error('알바 폼 스크랩 중 에러 발생', error);
    throw error;
  }
};

// 알바폼 스크랩 취소
export const fetchCancelScrapForms = async (formId: number) => {
  try {
    const response = await instance.delete(`/forms/${formId}/scrap`);
    if (!response.data) {
      throw new Error('알바폼 스크랩 취소 실패');
    }
  } catch (error) {
    console.error('알바 폼 스크랩 취소 중 에러 발생', error);
    throw error;
  }
};
