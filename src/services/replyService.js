import { url } from "./urlRoot";

export const createReply = (text, parent) =>
  fetch(`${url}/api/reviews/${parent}/replies`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ text, parent }),
    headers: { "content-type": "application/json" },
  });

export const findRepliesForUser = (userId) =>
  fetch(`${url}/api/users/${userId}/replies`, {
    credentials: "include",
  }).then((response) => response.json());

export const findRepliesForReview = (reviewId) =>
  fetch(`${url}/api/reviews/${reviewId}/replies`, {
    credentials: "include",
  }).then((response) => response.json());

export const flagReply = (reply) =>
  fetch(`${url}/api/replies`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(reply),
    headers: { "content-type": "application/json" },
  });

export const findAllReplies = () =>
  fetch(`${url}/api/replies`, {
    credentials: "include",
  }).then((response) => response.json());

export const deleteReply = (reviewId, replyId) =>
  fetch(`${url}/api/reviews/${reviewId}/replies/${replyId}`, {
    method: "DELETE",
    credentials: "include",
  });

export const editReply = (reply) =>
  fetch(`${url}/api/replies/${reply._id}`, {
    method: "PUT",
    body: JSON.stringify(reply),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
