import { url } from "./urlRoot";

export const register = (username, password, role, adminKey, name) =>
  fetch(`${url}/api/register`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password, role, adminKey, name }),
    headers: { "content-type": "application/json" },
  }).then((response) => response.json());

export const login = (username, password) =>
  fetch(`${url}/api/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });

export const getSessionUser = () =>
  fetch(`${url}/api/currentUser`, {
    credentials: "include",
  });

export const getUser = (username) =>
  fetch(`${url}/api/users/${username}`, {
    credentials: "include",
  });

export const logOut = () => {
  return fetch(`${url}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const blockUser = (username) =>
  fetch(`${url}/api/users/${username}`, {
    method: "PUT",
    credentials: "include",
  }).then((response) => response.json());
