export interface SignUp {
  email: string;
  password: string;
  name: string;
  nickname: string;
  role: "OWNER" | "APPLICANT";
  storeName?: string;
  storePhoneNumber?: string;
  phoneNumber?: string;
  location?: string;
}

export interface SignIn {
  email: string;
  password: string;
}
