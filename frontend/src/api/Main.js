import { api } from "./api";

//메인페이지 정보 호출
export const getMainInfo = () => {
  const url = `main`;
  return api.get(url);
};
