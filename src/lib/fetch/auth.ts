import instance from "../api/api";
import { SignUp, SignIn } from "@/lib/types";

// 회원가입
export const signUp = async (signUpData: SignUp) => {
  try {
    const response = await instance.post(`/auth/sign-up`, signUpData);
    if (!response.data) {
      throw new Error("회원가입에 실패하였습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("회원가입 시도중 에러가 발생하였습니다.", error);
    throw error;
  }
};

// 로그인
export const signIn = async (signInData: SignIn) => {
  try {
    const response = await instance.post(`/auth/sign-in`, signInData);
    if (!response.data) {
      throw new Error("로그인에 실패하였습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("로그인 시도중 에러가 발생하였습니다.", error);
    throw error;
  }
};
