import { SetStateAction } from 'react';

export interface DetailApplicationDataProps {
  id: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}

export interface EditModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  handleCloseModal: () => void;
  onSuccess: () => void;
  status: string;
  applicationId: number;
  formId: number;
}
