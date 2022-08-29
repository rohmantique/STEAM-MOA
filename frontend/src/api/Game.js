import { api } from "./api";

export const getGamesSearch = (page, searchFilter, searchWord) => {
  let url = `games/search?page=${page}`;
  url += searchWord ? `&name=${searchWord}` : "";

  searchFilter.forEach((filterItem) => {
    url += `&tag=${filterItem.name}`;
  });
  return api.get(url);
};

export const getGame = (gameId) => {
  const url = `games/${gameId}`;
  return api.get(url);
};
