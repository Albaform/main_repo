import {
  ListData,
  InfoWatchedFields,
  PasswordWatchedFields,
} from '@/app/mypage/types';
import instance from '../api/api';
import { AxiosError } from 'axios';

// 내 정보 조회
export const fetchUser = async () => {
  try {
    const response = await instance.get('/users/me');
    if (!response.data) {
      throw new Error('유저 데이터 불러오기 실패');
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error('유저 정보 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내 정보 수정
export const fetchEditUser = async (payload: InfoWatchedFields) => {
  const { name, imageUrl, nickname, store, storeTel, phoneNumber, address } =
    payload;

  try {
    const response = await instance.patch('/users/me', {
      name,
      nickname: nickname,
      imageUrl,
      storeName: store,
      storePhoneNumber: storeTel,
      phoneNumber,
      location: address,
    });
    if (!response.data) {
      throw new Error('유저 데이터 수정 실패');
    }
  } catch (error) {
    console.error('유저 정보 수정 중 에러 발생:', error);
    throw error;
  }
};

// 비밀번호 변경
export const fetchUpdatePassword = async (formData: PasswordWatchedFields) => {
  const { currentPassword, newPassword } = formData;

  try {
    const response = await instance.patch('/users/me/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError;
  }
};

// 내가 생성한 알바폼 목록 조회
export const fetchMyForms = async () => {
  try {
    const response = await instance.get('/users/me/forms');
    if (!response.data) {
      throw new Error('내 폼 데이터 불러오기 실패');
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error('내 폼 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 지원한 알바폼 목록 조회
export const fetchMyAppications = async () => {
  try {
    const response = await instance.get('/users/me/applications');
    if (!response.data) {
      throw new Error('내 지원서 데이터 불러오기 실패');
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error('내 지원서 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 스크랩한 알바폼 목록 조회
export const fetchMyScrap = async ({
  isScrapSort,
  itemsPerPage,
  cursor,
}: {
  isScrapSort?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  itemsPerPage: number;
  cursor: number;
}) => {
  try {
    const requestUrl =
      cursor === 1
        ? `/users/me/scraps?limit=${itemsPerPage}&orderBy=${isScrapSort}`
        : `/users/me/scraps?limit=${itemsPerPage}&orderBy=${isScrapSort}`;

    const response = await instance.get(requestUrl);

    if (!response.data) {
      throw new Error('내 스크랩 데이터 불러오기 실패');
    }

    return {
      result: response.data.data,
      nextPage: response.data.nextCursor,
    };
  } catch (error) {
    console.error('내 스크랩 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 작성한 게시물 목록 조회
export const fetchMyPosts = async ({
  isPostSort,
  itemsPerPage,
  cursor,
}: {
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  itemsPerPage: number;
  cursor: number;
}): Promise<{ result: ListData[]; nextPage: number }> => {
  try {
    const requestUrl =
      cursor === 1
        ? `/users/me/posts?limit=${itemsPerPage}&orderBy=${isPostSort}`
        : `/users/me/posts?limit=${itemsPerPage}&orderBy=${isPostSort}&cursor=${cursor}`;

    const response = await instance.get(requestUrl);

    if (!response.data) {
      throw new Error('내 게시물 데이터 불러오기 실패');
    }

    return {
      result: response.data.data,
      nextPage: response.data.nextCursor,
    };
  } catch (error) {
    console.error('내 게시물 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 작성한 댓글 목록 조회
export const fetchMyComments = async (page: number) => {
  try {
    const response = await instance.get(
      `/users/me/comments?page=${page}&pageSize=6`,
    );
    if (!response.data) {
      throw new Error('내 댓글 데이터 불러오기 실패');
    }

    return {
      result: response.data.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('내 댓글 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};
