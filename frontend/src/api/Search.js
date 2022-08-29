import { api } from "./api";

export const getSearchLists = (type, keyword) => {
  let url = `search?type=${type}&keyword=${keyword}`;
  return api.get(url);
};
