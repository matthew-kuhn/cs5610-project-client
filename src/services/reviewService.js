import { url } from "./urlRoot";

export const createReview = (text, movieId, movieTitle) =>
  fetch(`${url}/api/reviews`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ text, movieId, movieTitle }),
    headers: { "content-type": "application/json" },
  });

export const findReviewsForMovie = (movieId) =>
  fetch(`${url}/api/movies/${movieId}/reviews`, {
    credentials: "include",
  }).then((response) => response.json());

export const findReviewsForUser = (username) =>
  fetch(`${url}/api/users/${username}/reviews`, {
    credentials: "include",
  }).then((response) => response.json());

export const flagReview = (review) =>
  fetch(`${url}/api/reviews`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(review),
    headers: { "content-type": "application/json" },
  });

export const findAllReviews = () =>
  fetch(`${url}/api/reviews`, {
    credentials: "include",
  }).then((response) => response.json());

export const deleteReview = (reviewId) =>
  fetch(`${url}/api/reviews/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
  });

export const editReview = (reviewId, review) =>
  fetch(`${url}/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(review),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
