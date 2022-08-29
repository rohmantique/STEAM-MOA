import { api, apiAuth } from "./api";

export const postReviews = (review) => {
  const url = `game/reviews`;
  return apiAuth.post(url, review);
};

export const putReviews = (review) => {
  const url = `game/reviews`;
  return apiAuth.put(url, review);
};

export const deleteReviews = (reviewId) => {
  const url = `game/reviews/${reviewId}`;
  return apiAuth.delete(url);
};

export const getUserReviews = (userServiceId) => {
  const url = `game/reviews/${userServiceId}`;
  return api.get(url);
};

export const getGameReviews = (gameId) => {
  const url = `game/reviews/game/${gameId}`;
  return api.get(url);
};

export const getUserHasReviews = (userServiceId,gameId) => {
  const url = `game/reviews/${userServiceId}/${gameId}`;
  return api.get(url);
}