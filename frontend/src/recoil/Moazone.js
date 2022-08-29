import { atom } from "recoil";

// 모아존 최대 페이지 정보
export const moaMaxPage = atom({
  key: "moaMaxPage",
  default: 1,
});

//모아존 검색 필터
export const moaSearchFilter = atom({
  key: "moaSearchFilter",
  default: [],
});
