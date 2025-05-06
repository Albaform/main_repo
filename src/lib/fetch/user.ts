import instance from '../api/api';

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
export const fetchEditUser = async () => {
  try {
    const response = await instance.patch('/users/me');
    if (!response.data) {
      throw new Error('유저 데이터 수정 실패');
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error('유저 정보 수정 중 에러 발생:', error);
    throw error;
  }
};

// 비밀번호 변경
export const fetchUpdatePassword = async () => {
  try {
    const response = await instance.patch('/users/me/password');
    if (!response.data) {
      throw new Error('비밀번호 수정 실패');
    }
    const result = response.data;
    return result;
  } catch (error) {
    console.error('비밀번호 수정 중 에러 발생:', error);
    throw error;
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
  cursor
}:{isScrapSort?:'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped'; cursor:number}) => {
  try {
    const response = await instance.get(`/users/me/scraps?limit=6&orderBy=${isScrapSort}`);
    if (!response.data) {
      throw new Error('내 스크랩 데이터 불러오기 실패');
    }
    const result = response.data.data;
    return result;
  } catch (error) {
    console.error('내 스크랩 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 작성한 게시물 목록 조회
export const fetchMyPosts = async ({
  isPostSort,
  cursor
}: {
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  cursor:number
}) => {
  try {
    const response = await instance.get(
      `/users/me/posts?limit=6&orderBy=${isPostSort}`,
    );
    if (!response.data) {
      throw new Error('내 게시물 데이터 불러오기 실패');
    }
    const result = response.data.data;
    return {result};
  } catch (error) {
    console.error('내 게시물 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 내가 작성한 댓글 목록 조회
export const fetchMyComments = async () => {
  try {
    const response = await instance.get('/users/me/comments?pageSize=6');
    if (!response.data) {
      throw new Error('내 댓글 데이터 불러오기 실패');
    }
    const result = response.data.data;
    return {result};
  } catch (error) {
    console.error('내 댓글 데이터 불러오는 중 에러 발생:', error);
    throw error;
  }
};