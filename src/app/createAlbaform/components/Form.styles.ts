import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 640px;

  @media (max-width: 1024px) {
    gap: 32px;
    max-width: 100%;
  }
`;

//  라벨 + 인풋 태그 그룹화
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    gap: 12px;
  }
`;

//  label 태그
export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
`;

//  필수사항 마크
export const RequiredMark = styled.span`
  color: var(--primary-orange400);
  font-size: 12px;
`;

//  input 태그
export const FormInput = styled.input`
  background-color: var(--background200);
  color: var(--black400);
  width: 100%;
  padding: 14px 14px 12px 14px;
  border-radius: 8px;

  &::placeholder {
    color: var(--gray400);
    font-size: 14px;
  }
`;

//  textarea 태그
export const FormTextarea = styled.textarea`
  background-color: var(--background200);
  color: var(--black400);
  width: 100%;
  height: 160px;
  padding: 14px;
  border-radius: 8px;
  resize: none;

  &::placeholder {
    color: var(--gray400);
    font-size: 14px;
  }
`;

//  이미지 인풋
export const ImageUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`;
export const UploadBox = styled.label`
  background-color: var(--background200);
  color: var(--gray400);
  width: 110px;
  height: 110px;
  font-size: 28px;
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }
`;
export const HiddenFileInput = styled.input`
  display: none;
`;
export const PreviewWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border: 0.2px solid var(--gray100);
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }
`;
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--white);
  color: var(--black100);
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  text-align: center;
  width: 20px;
  height: 20px;
  border: 0.5px solid var(--black100);
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;
