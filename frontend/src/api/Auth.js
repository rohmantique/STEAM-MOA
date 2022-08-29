import { api, apiAuth } from "./api";

//회원가입 Post
export const postSignup = (signUpInfo) => {
  const url = `auth`;
  return api.post(url, signUpInfo);
};

//로그인 Post
export const postLogin = (loginInfo) => {
  const url = `auth/login`;
  return api.post(url, loginInfo);
};

//서비스 아이디 중복 검사 Get
export const getServiceIdDuplicate = (userServiceId) => {
  const url = `auth/signup/duplicated/${userServiceId}`;
  return api.get(url);
};

//비밀번호 확인 [헤더필요]
export const postPWCheck = (user) => {
  const url = 'auth/check';
  return apiAuth.post(url, user);
};

//회원 탈퇴 [헤더필요]
export const deleteUser = (userServiceId) => {
  const url = `auth/${userServiceId}`;
  return apiAuth.delete(url);
};