export type UserRole = 'APPLICANT' | 'OWNER';
export type User = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  imageUrl: string;
  role: UserRole;
  storeName: string;
  storePhoneNumber: number;
  phoneNumber: number;
  location: string;
};

export interface SignInResponse {
  user: User[];
  accesstoken: string;
  refreshToken: string;
}
