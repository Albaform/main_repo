import instance from '../api/api';

// 이미지 업로드
export const fetchUploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await instance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data) {
      throw new Error('이미지 업로드 실패');
    }
    return response.data.url;
  } catch (error) {
    console.error('이미지 업로드 중 에러 발생', error);
    throw error;
  }
};

// 이력서 업로드
export const fetchUploadResume = async (
  file: File,
): Promise<{ resumeId: number; resumeName: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await instance.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data) {
      throw new Error('이력서 업로드 실패');
    }
    return {
      resumeId: response.data.resumeId,
      resumeName: response.data.resumeName,
    };
  } catch (error) {
    console.error('이력서 업로드 중 에러 발생', error);
    throw error;
  }
};

// 이력서 다운로드
export const fetchDownloadResume = async (
  resumeId: number,
  resumeName: string,
) => {
  try {
    const response = await instance.get<Blob>(`/${resumeId}/download`, {
      responseType: 'blob',
    });

    if (!response.data) {
      throw new Error('이력서 다운로드 실패');
    }

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = resumeName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('이력서 다운로드 중 에러 발생', error);
    throw error;
  }
};
